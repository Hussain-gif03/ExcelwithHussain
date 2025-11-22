import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { modulesApi, lessonsApi, quizzesApi, quizQuestionsApi, progressApi, quizAttemptsApi } from '@/db/api';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import type { Module, Lesson, Quiz, QuizQuestion } from '@/types/types';
import { BookOpen, CheckCircle, ArrowLeft, Play, Award, AlertCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [bestAttempt, setBestAttempt] = useState<{ score: number; passed: boolean } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!moduleId) return;

      try {
        const moduleData = await modulesApi.getModule(moduleId);
        setModule(moduleData);

        const lessonsData = await lessonsApi.getLessonsByModule(moduleId);
        setLessons(lessonsData);
        if (lessonsData.length > 0) {
          setSelectedLesson(lessonsData[0]);
        }

        const quizData = await quizzesApi.getQuizByModule(moduleId);
        setQuiz(quizData);

        if (quizData) {
          const questionsData = await quizQuestionsApi.getQuestionsByQuiz(quizData.id);
          setQuestions(questionsData);
        }

        if (user) {
          const userProgress = await progressApi.getUserProgress(user.id);
          const completed = new Set(
            userProgress
              .filter(p => p.completed && lessonsData.some(l => l.id === p.lesson_id))
              .map(p => p.lesson_id)
          );
          setCompletedLessons(completed);

          if (quizData) {
            const attempt = await quizAttemptsApi.getBestAttempt(user.id, quizData.id);
            if (attempt) {
              setBestAttempt({ score: attempt.score, passed: attempt.passed });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching module details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [moduleId, user]);

  const handleMarkComplete = async (lessonId: string) => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to track your progress',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    try {
      await progressApi.markLessonComplete(user.id, lessonId);
      setCompletedLessons(prev => new Set([...prev, lessonId]));
      toast({
        title: 'Lesson Completed!',
        description: 'Your progress has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save progress',
        variant: 'destructive',
      });
    }
  };

  const handleSubmitQuiz = async () => {
    if (!user || !quiz) {
      toast({
        title: 'Login Required',
        description: 'Please login to take the quiz',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (Object.keys(quizAnswers).length !== questions.length) {
      toast({
        title: 'Incomplete Quiz',
        description: 'Please answer all questions before submitting',
        variant: 'destructive',
      });
      return;
    }

    let correctCount = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct_answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= quiz.passing_score;

    try {
      await quizAttemptsApi.submitAttempt({
        user_id: user.id,
        quiz_id: quiz.id,
        score,
        passed,
        answers: quizAnswers,
      });

      setQuizResult({ score, passed });
      setQuizSubmitted(true);

      if (passed) {
        toast({
          title: 'Congratulations!',
          description: `You passed with ${score}%!`,
        });
        if (!bestAttempt || score > bestAttempt.score) {
          setBestAttempt({ score, passed });
        }
      } else {
        toast({
          title: 'Quiz Not Passed',
          description: `You scored ${score}%. Passing score is ${quiz.passing_score}%. Try again!`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit quiz',
        variant: 'destructive',
      });
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-8 w-32 mb-8 bg-muted" />
        <Skeleton className="h-12 w-96 mb-12 bg-muted" />
        <Skeleton className="h-96 w-full bg-muted" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">Module not found</p>
        <Button asChild className="mt-4">
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button asChild variant="ghost" className="mb-8">
        <Link to={`/courses`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
        <p className="text-lg text-muted-foreground">{module.description}</p>
      </div>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="lessons">
            <BookOpen className="h-4 w-4 mr-2" />
            Lessons ({lessons.length})
          </TabsTrigger>
          <TabsTrigger value="quiz" disabled={!quiz}>
            <Award className="h-4 w-4 mr-2" />
            Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Lesson List</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedLesson?.id === lesson.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Lesson {index + 1}</span>
                          {completedLessons.has(lesson.id) && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      </div>
                      <div className="text-sm mt-1 opacity-90">{lesson.title}</div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="xl:col-span-2">
              {selectedLesson ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{selectedLesson.title}</CardTitle>
                        {completedLessons.has(selectedLesson.id) && (
                          <Badge className="mt-2 bg-success text-success-foreground">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-sm max-w-none mb-6"
                      dangerouslySetInnerHTML={{ __html: selectedLesson.content.replace(/\n/g, '<br />') }}
                    />
                    {selectedLesson.video_url && (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Video Tutorial</h3>
                        <a 
                          href={selectedLesson.video_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-2"
                        >
                          <Play className="h-4 w-4" />
                          Watch Video
                        </a>
                      </div>
                    )}
                    {!completedLessons.has(selectedLesson.id) && (
                      <Button onClick={() => handleMarkComplete(selectedLesson.id)}>
                        Mark as Complete
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Select a lesson to begin</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          {quiz && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                <CardDescription>
                  Passing score: {quiz.passing_score}%
                  {bestAttempt && (
                    <span className="ml-4">
                      Best score: <strong className={bestAttempt.passed ? 'text-success' : 'text-destructive'}>
                        {bestAttempt.score}%
                      </strong>
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!quizSubmitted ? (
                  <div className="space-y-6">
                    {questions.map((question, index) => (
                      <div key={question.id} className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-4">
                          Question {index + 1}: {question.question}
                        </h3>
                        <RadioGroup
                          value={quizAnswers[question.id]?.toString()}
                          onValueChange={(value) => 
                            setQuizAnswers(prev => ({ ...prev, [question.id]: parseInt(value) }))
                          }
                        >
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                              <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-o${optionIndex}`} />
                              <Label htmlFor={`q${question.id}-o${optionIndex}`} className="cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                    <Button onClick={handleSubmitQuiz} size="lg">
                      Submit Quiz
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Alert className={quizResult?.passed ? 'border-success' : 'border-destructive'}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {quizResult?.passed ? (
                          <span className="text-success font-semibold">
                            Congratulations! You passed with {quizResult.score}%
                          </span>
                        ) : (
                          <span className="text-destructive font-semibold">
                            You scored {quizResult?.score}%. You need {quiz.passing_score}% to pass.
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-4">
                      {questions.map((question, index) => {
                        const userAnswer = quizAnswers[question.id];
                        const isCorrect = userAnswer === question.correct_answer;
                        return (
                          <div key={question.id} className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">
                              Question {index + 1}: {question.question}
                            </h3>
                            <div className="space-y-2">
                              {question.options.map((option, optionIndex) => {
                                const isUserAnswer = userAnswer === optionIndex;
                                const isCorrectAnswer = question.correct_answer === optionIndex;
                                return (
                                  <div
                                    key={optionIndex}
                                    className={`p-2 rounded ${
                                      isCorrectAnswer
                                        ? 'bg-success/10 border border-success'
                                        : isUserAnswer
                                        ? 'bg-destructive/10 border border-destructive'
                                        : ''
                                    }`}
                                  >
                                    {option}
                                    {isCorrectAnswer && <span className="ml-2 text-success">✓ Correct</span>}
                                    {isUserAnswer && !isCorrect && <span className="ml-2 text-destructive">✗ Your answer</span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Button onClick={handleRetakeQuiz} variant="outline">
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

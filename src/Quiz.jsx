
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingTimer from './FloatingTimer';
import questionMark from './assets/question.webp';
import questionAudio from './assets/audio.webp';
import YouTube from 'react-youtube';
import mchoice from './assets/mchoice.webp';
import fblank from './assets/fblank.webp';
import errorid from './assets/errorid.webp';
import completion from './assets/completion.webp';
import reading from './assets/reading.webp';
import acomprehension from './assets/acomprehension.webp';
import julie from './assets/julie.mp3'

const Quiz = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        handleRetry();

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    navigate('/timeout');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleRetry = () => {
        setAnswers({});
        setScore(0);
        setSubmitted(false);
    };

    const handleInputChange = (category, questionId, event) => {
        const { value } = event.target;
        handleAnswer(category, questionId, value);
    };


    const [questions, setQuestions] = useState({
        multipleChoice: [
            {
                "id": 1,
                "question": "___ (near)is my favorite book.",
                "options": ["This", "That", "These", "Those"],
                "answer": ["This"],
                "selectedOption": null
            },
            {
                "id": 2,
                "question": "Can you see ___(far) mountains over there?",
                "options": ["This", "That", "These", "Those"],
                "answer": ["Those"],
                "selectedOption": null
            },
            {
                "id": 3,
                "question": "___(near) apples are very sweet.",
                "options": ["This", "That", "These", "Those"],
                "answer": ["These"],
                "selectedOption": null
            },
            {
                "id": 4,
                "question": "___(far) is the house where I grew up.",
                "options": ["This", "That", "These", "Those"],
                "answer": ["That"],
                "selectedOption": null
            },
            {
                "id": 5,
                "question": "Who left ___(near) books on my desk?",
                "options": ["This", "That", "These", "Those"],
                "answer": ["These"],
                "selectedOption": null
            }
        ]

        ,
        fillInTheBlank: [
            {
                "id": 6,
                "question": "I can't believe ___(near) is happening.",
                "options": [],
                "answer": ["this"],
                "selectedOption": null
            },
            {
                "id": 7,
                "question": "Look at ___(near) pictures from our vacation.",
                "options": [],
                "answer": ["these"],
                "selectedOption": null
            },
            {
                "id": 8,
                "question": "Is ___ (far)your coat?",
                "options": [],
                "answer": ["that"],
                "selectedOption": null
            },
            {
                "id": 9,
                "question": "___(far) are my grandparents.",
                "options": [],
                "answer": ["Those"],
                "selectedOption": null
            },
            {
                "id": 10,
                "question": "___(near) is my favorite song.",
                "options": [],
                "answer": ["This"],
                "selectedOption": null
            }
        ]



        ,
        errorIdentification: [
            {
                "id": 11,
                "question": "This are the books I borrowed from the library.",
                "options": ["This", "are", "borrowed", "No error"],
                "answer": ["This"],
                "selectedOption": null
            },
            {
                "id": 12,
                "question": "Those is my favorite pair of shoes.",
                "options": ["Those", "is", "favorite", "No error"],
                "answer": ["is"],
                "selectedOption": null
            },
            {
                "id": 13,
                "question": "That are the best cookies I have ever eaten.",
                "options": ["That", "are", "best", "No error"],
                "answer": ["are"],
                "selectedOption": null
            },
            {
                "id": 14,
                "question": "These was a great movie.",
                "options": ["These", "was", "great", "No error"],
                "answer": ["These"],
                "selectedOption": null
            },
            {
                "id": 15,
                "question": "Is this the books you were talking about?",
                "options": ["Is", "this", "books", "No error"],
                "answer": ["this"],
                "selectedOption": null
            }
        ]


        ,
        sentenceCompletion: [
            {
                "id": 16,
                "question": "___ (near)is the best day of my life.",
                "options": ["This", "That", "These", "Those"],
                "answer": ["This"],
                "selectedOption": null
            },
            {
                "id": 17,
                "question": "Can you pass me ___(far) pen?",
                "options": ["This", "That", "These", "Those"],
                "answer": ["that"],
                "selectedOption": null
            },
            {
                "id": 18,
                "question": "___(near) are the shoes I want to buy.",
                "options": ["This", "That", "These", "Those"],
                "answer": ["These"],
                "selectedOption": null
            },
            {
                "id": 19,
                "question": "Who are ___(far) people in the photograph?",
                "options": ["This", "That", "These", "Those"],
                "answer": ["those"],
                "selectedOption": null
            },
            {
                "id": 20,
                "question": "___(near) is a beautiful painting.",
                "options": ["This", "That", "These", "Those"],
                "answer": ["This"],
                "selectedOption": null
            }
        ]


        ,
        paragraphInterpretation: [
            {
                "id": 21,
                "question": "When did the Industrial Revolution begin?",
                "options": ["Early 18th century", "Late 18th century", "Early 19th century", "Late 19th century"],
                "answer": ["Late 18th century"]
            },
            {
                "id": 22,
                "question": "What technological advancement played a crucial role in the Industrial Revolution?",
                "options": ["Telecommunication", "Steam engine", "Photography", "Electricity"],
                "answer": ["Steam engine"]
            },
            {
                "id": 23,
                "question": "Why did the Industrial Revolution lead to urbanization?",
                "options": ["To reduce overcrowding in rural areas", "To promote cultural diversity", "To centralize political power", "To accommodate factory workers"],
                "answer": ["To accommodate factory workers"]
            },
            {
                "id": 24,
                "question": "How did the Industrial Revolution impact social structures?",
                "options": ["It reduced social inequalities", "It strengthened feudal systems", "It led to the rise of the working class", "It promoted monarchy"],
                "answer": ["It led to the rise of the working class"]
            },
            {
                "id": 25,
                "question": "Who benefited the most from the economic changes during the Industrial Revolution?",
                "options": ["Farmers", "Artisans", "Factory owners", "Monarchs"],
                "answer": ["Factory owners"]
            }
        ]


        ,

        // audioComprehension: [
        //     {
        //         id: 100,
        //         question: " What is Julie's favorite color?",
        //         options: ["Blue", "Green"],
        //         answer: "Blue",
        //         selectedOption: null,
        //         audio: julie
        //     },
        // ],
    });



    const handleAnswer = (category, questionId, selectedOption) => {
        const updatedAnswers = { ...answers, [questionId]: selectedOption };
        setAnswers(updatedAnswers);

        const updatedQuestions = {
            ...questions,
            [category]: questions[category].map(question => {
                if (question.id === questionId) {
                    return { ...question, selectedOption };
                }
                if (question.questions) {
                    return {
                        ...question,
                        questions: question.questions.map(subQuestion => {
                            if (subQuestion.id === questionId) {
                                return { ...subQuestion, selectedOption };
                            }
                            return subQuestion;
                        }),
                    };
                }
                return question;
            }),
        };
        setQuestions(updatedQuestions);
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        Object.values(questions).flat().forEach(question => {
            const isCorrect = Array.isArray(question.answer)
                ? question.answer.includes(answers[question.id])
                : question.answer === answers[question.id];

            if (isCorrect) {
                correctAnswers += 1;
            }
        });

        const newScore = correctAnswers;
        setScore(newScore);

        const percentage = (correctAnswers / Object.values(questions).flat().length) * 100;

        navigate('/results', { state: { score: newScore, percentage: percentage } });
    };

    const renderQuestions = (category, questions) => (
        <div className='category-container'>
            {questions.map(question => (
                <div className='text-center my-20' key={question.id}>
                    {question.audio && (
                        <>
                            <audio src={question.audio} controls preload="auto" className="mx-auto w-[100%]"></audio>
                            <p className='mb-2 py-5'>{question.question}</p>
                        </>
                    )}
                    {question.video && (
                        <div className="relative">
                            <YouTube
                                videoId="cVsyJvxX48A"
                                className="mx-auto w-full"
                                opts={{ width: '100%' }}
                            />
                            <p className="mb-2 py-5">{question.question}</p>
                        </div>
                    )}
                    {!question.audio && !question.video && (
                        <>
                            <img className='w-24 m-auto' src={questionMark} alt="Question Mark" />
                            <p className=' mb-2 px-3'>{question.question}</p>
                        </>
                    )}

                    {!question.questions && (
                        <div className='flex flex-wrap justify-center'>
                            {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                <input
                                    type="text"
                                    className='py-2 px-4 border-b-2 border-slangup focus:outline-none focus:border-b-2 focus:border-slangup'
                                    value={question.selectedOption || ''}
                                    onChange={(e) => handleInputChange(category, question.id, e)}
                                    disabled={submitted}
                                />
                            ) : (
                                question.options.map(option => (
                                    <button
                                        key={option}
                                        className={`py-1 px-5 rounded ${question.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                        onClick={() => handleAnswer(category, question.id, option)}
                                        disabled={submitted}
                                        style={{ width: question.options.length > 2 ? '80%' : '50%' }}
                                    >
                                        {option}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                    {question.questions && question.questions.map(subQuestion => (
                        <div className='my-10' key={subQuestion.id}>
                            <p className='px-7'>{subQuestion.question}</p>
                            <div className='flex flex-wrap justify-center'>
                                {category === 'fillInTheBlank' || category === 'sentenceCompletion' ? (
                                    <input
                                        type="text"
                                        className='py-1 px-4 rounded border-2 border-gray-300 mb-2 mr-2'
                                        value={subQuestion.selectedOption || ''}
                                        onChange={(e) => handleInputChange(category, subQuestion.id, e)}
                                        disabled={submitted}
                                    />
                                ) : (
                                    subQuestion.options.map(option => (
                                        <button
                                            key={option}
                                            className={`py-1 px-5 rounded ${subQuestion.selectedOption === option ? 'bg-green-500' : 'bg-slangup hover:bg-white hover:text-slangup'} text-white font-bold mb-2 mr-2`}
                                            onClick={() => handleAnswer(category, subQuestion.id, option)}
                                            disabled={submitted}
                                            style={{ width: subQuestion.options.length > 2 ? '80%' : '50%' }}
                                        >
                                            {option}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );


    return (
        <div className='font-custom flex flex-col items-center space-y-3 mb-20'>
            <h1 className='font-semibold text-center px-5 pb-7'>Read each question carefully before answering. Good luck!</h1>
            <FloatingTimer timeLeft={timeLeft} formatTime={formatTime} />

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Multiple Choice Questions</h2>
                <img className='w-[150px]' src={mchoice} alt='' />
            </div>
            {renderQuestions("multipleChoice", questions.multipleChoice)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Fill In The Blank</h2>
                <img className='w-[150px]' src={fblank} alt='' />
            </div>
            {renderQuestions("fillInTheBlank", questions.fillInTheBlank)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>What's The Error?</h2>
                <img className='w-[150px]' src={errorid} alt='' />
            </div>
            {renderQuestions("errorIdentification", questions.errorIdentification)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Complete The Sentence</h2>
                <img className='w-[150px]' src={completion} alt='' />
            </div>
            {renderQuestions("sentenceCompletion", questions.sentenceCompletion)}

            <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Paragraph Interpretation</h2>
                <img className='w-[150px]' src={reading} alt='' />
            </div>
            <div className='pt-7 flex flex-col items-center'>
                <h2>A Day in the Park</h2>
                <p className='mb-2 px-10 text-justify font-light text-gray-700'>

                    Last Saturday, I decided to spend the day at the park. The weather was perfect, with clear skies and a gentle breeze. I packed a picnic basket with some sandwiches, fruit, and a bottle of lemonade. When I arrived at the park, I found a nice spot under a large oak tree and laid out my blanket.

                    After enjoying my lunch, I took a walk around the park. There were many people enjoying the day—some were playing frisbee, others were jogging, and a few were having barbecues with their families. I saw a group of children flying kites, their colorful kites dancing in the sky.

                    Later in the afternoon, I decided to read a book I had brought with me. The story was so interesting that I lost track of time. When I finally looked up, the sun was beginning to set, casting a warm glow over the park. I packed up my things and headed home, feeling relaxed and happy after a wonderful day outdoors..</p>
            </div>
            {renderQuestions("paragraphInterpretation", questions.paragraphInterpretation)}


            {/* <div className='bg-slangup w-[100%] flex flex-col items-center'>
                <h2 className='font-semibold text-center px-5 text-xl pt-7 text-white'>Audio Comprehension</h2>
                <img className='w-[150px]' src={acomprehension} alt='' />
            </div>
            {renderQuestions("audioComprehension", questions.audioComprehension)} */}

            <button onClick={handleSubmit} className=' bg-green-500 hover:bg-white hover:text-slangup text-white font-bold py-2 px-4 rounded mx-auto 
                w-[80%]' disabled={submitted}>
                Submit
            </button>
        </div>
    );
};

export default Quiz;

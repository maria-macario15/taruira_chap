import React, { useState } from 'react';
import './feedback.css';

const FeedbackForm = () => {
    const [selectedRating, setSelectedRating] = useState('');
    const [feedbackText, setFeedbackText] = useState('');

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    const handleSendFeedback = async () => {
        if (!selectedRating || !feedbackText) {
            alert('Por favor, selecione uma avaliação e insira seu feedback antes de enviar.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/feedback/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: selectedRating, feedback_text: feedbackText }),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar feedback');
            }

            console.log('Feedback enviado com sucesso!');
            alert('Feedback enviado com sucesso!');
            setSelectedRating('');
            setFeedbackText('');
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            alert('Erro ao enviar feedback. Por favor, tente novamente.');
        }
    };

    return (
        <div className="feedback-container">
            <h1>Agora que você conhece nosso trabalho, poderia nos avaliar?</h1>
            <div className="ratings-container">
                <div
                    className={`rating ${selectedRating === 'Insatisfeita' ? 'active' : ''}`}
                    onClick={() => handleRatingClick('Insatisfeita')}
                >
                    <i className="bi bi-emoji-frown"></i>
                    <p>Insatisfeita</p>
                </div>
                <div
                    className={`rating ${selectedRating === 'Neutra' ? 'active' : ''}`}
                    onClick={() => handleRatingClick('Neutra')}
                >
                    <i className="bi bi-emoji-neutral"></i>
                    <p>Neutra</p>
                </div>
                <div
                    className={`rating ${selectedRating === 'Ameii' ? 'active' : ''}`}
                    onClick={() => handleRatingClick('Ameii')}
                >
                    <i className="bi bi-emoji-heart-eyes"></i>
                    <p>Ameii</p>
                </div>
            </div>

            <textarea
                placeholder="Escreva seu feedback aqui..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="feedback-textarea"
            />

            <div className="feedback-response">
                {selectedRating && (
                    <div>
                        <i className="fas fa-heart"></i>
                        <h2>Muito obrigado!</h2>
                        <p>Feedback: {selectedRating}</p>
                    </div>
                )}
            </div>
            <button className="btn" onClick={handleSendFeedback}>
                Enviar
            </button>
        </div>
    );
};

export default FeedbackForm;

import express, { Request, Response, NextFunction } from "express";
export const router: express.Router = express.Router();
import { GenerateData } from "../services/GenerateData.service";
const generator = new GenerateData();
import * as uglifyJS from 'uglify-js';
import CleanCSS from 'clean-css'; // Importação da biblioteca
const cleaner = new CleanCSS({
    level: {
        1: { all: true }, // Nível 1 de otimizações
        2: { all: true }  // Nível 2 de otimizações (reestruturação)
    }
});
router.get('/form-widget.js', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/javascript');

    const modalHTML = `
        <div class="modal-background" id="modalBackground">
            <div class="modal-container">
                <div class="modal-header">
                    <span>Your feedback is crucial ❤</span>
                    <button id="closeModal">X</button>
                </div>
                <div class="modal-content">
                    <label>Email</label>
                    <input type="email" placeholder="Your email..." id="emailInput" required>
                    <div class="error-message" id="emailError">This field is required!</div>
                    <label>Feedback</label>
                    <textarea placeholder="Please write your feedback here..." id="feedbackInput" required></textarea>
                    <div class="error-message" id="feedbackError">This field is required!</div>
                    <div class="emoji-rating">
                        <span data-value='1'>😔</span>
                        <span data-value='2'>😐</span>
                        <span data-value='3'>😊</span>
                        <span data-value='4'>😁</span>
                        <span data-value='5'>🤩</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="sendFeedback">SEND FEEDBACK</button>
                </div>
            </div>
        </div>
    `;

    const script = `
        function openModal() {
            const modalBackground = document.getElementById('modalBackground');
            modalBackground.style.visibility = 'visible';
            modalBackground.style.opacity = '1';
        }
        function closeModal() {
            document.getElementById('modalBackground').style.visibility = 'hidden';
            document.getElementById('modalBackground').style.opacity = '0';
        }                
        document.addEventListener('DOMContentLoaded', function() {
            const feedbackButton = document.createElement('div');
            feedbackButton.setAttribute('class', 'feedbacks-container');
            feedbackButton.innerHTML = '<p>Feedback</p>';
            document.body.appendChild(feedbackButton);

            feedbackButton.addEventListener('click', openModal);

            const modalDiv = document.createElement('div');
            modalDiv.innerHTML = \`${modalHTML.replace(/`/g, "\\`")}\`;
            document.body.appendChild(modalDiv);

            document.getElementById('closeModal').addEventListener('click', closeModal);

            document.getElementById('sendFeedback').addEventListener('click', validateForm);

            // Adicionando interação com emojis
            const emojis = document.querySelectorAll('.emoji-rating span');
            emojis.forEach(emoji => {
                emoji.addEventListener('click', function() {
                    emojis.forEach(e => e.classList.remove('selected'));
                    emoji.classList.add('selected');
                });
            });
        });

        function validateForm() {
            let isValid = true;
            const email = document.getElementById('emailInput');
            const feedback = document.getElementById('feedbackInput');
            const selectedEmoji = document.querySelector('.emoji-rating span.selected');
            if (!email.value) {
                document.getElementById('emailError').style.display = 'block';
                email.classList.add('input-error');
                isValid = false;
            } else {
                document.getElementById('emailError').style.display = 'none';
                email.classList.remove('input-error');
            }
            if (!feedback.value) {
                document.getElementById('feedbackError').style.display = 'block';
                feedback.classList.add('input-error');
                isValid = false;
            } else {
                document.getElementById('feedbackError').style.display = 'none';
                feedback.classList.remove('input-error');
            }
            if (isValid) {
                sendFeedback(email.value, feedback.value, selectedEmoji ? selectedEmoji.dataset.value : '');
            }
        }

        function sendFeedback(email, feedback, emoji) {
            console.log('Sending feedback...', {email, feedback, emoji});
        }
    `;

    const result = uglifyJS.minify(script);
    if (result.error) {
        console.error('Error during script minification:', result.error);
        res.status(500).send('Error processing JavaScript');
    } else {
        res.write(result.code);
        res.end();
    }
});



router.get('/feedbacks.css', (req: Request, res: Response) => {
    res.writeHead(200, {
        'Content-Type': 'text/css'
    });
    const css = `
        .feedbacks-container {
            position:fixed;
            bottom:0px;
            right:0px;
            padding:5px 10px 5px 10px;
            border-radius:7px 7px 0px 0px;
            border:1.5px dashed grey;
            margin-right:10px;
            border-bottom:none;
            transition:.1s;
        }
        .feedbacks-container:hover {
            transition:.3s;
            border:1.5px dashed #05c46b;
            border-bottom:none;
            color:white;
            cursor:pointer;
        }
        .feedbacks-container p {
            text-align:center;
            margin:0 auto;
            font-size:15px;
            color:grey;
            font-weight:500;
        }
     .feedbacks-container p:hover {
            color:#05c46b;
        }
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s;
}

.modal-container {
    background-color: white;
    width: 90%; /* Largura padrão para telas pequenas */
    max-width: 500px; /* Largura máxima para telas grandes */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: left; /* Alinhamento do texto para a esquerda */
}

@media (min-width: 768px) {
    .modal-container {
        width: 50%; /* Aumenta a largura em telas maiores */
    }
}

@media (min-width: 992px) {
    .modal-container {
        width: 30%; /* Ajuste para desktops */
    }
}


.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-header span {
    font-size: 19px;
    font-weight: bold;
    text-align:center;
    color: #333;
}

#closeModal {
    cursor: pointer;
    border: none;
    background: #2b323d;
    color:white;
    border-radius:5px;
    padding:0px 10px 0px 10px;
    font-size: 24px;
}
    #closeModal:hover {
    background-color:#303540;
    }

.modal-content label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
    color: #666;
}

input[type="email"], textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

textarea {
    height: 100px;
    resize: vertical;
}

.emoji-rating {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
}

.emoji-rating span {
    font-size: 24px;
    cursor: pointer;
    padding: 0 5px;
    opacity: 0.5;  /* Emojis começam opacos */
    transition: transform 0.3s, opacity 0.3s;
}
.emoji-rating span:hover {
    opacity: 1;    /* Emojis ficam totalmente visíveis quando selecionados */
    transform: scale(1.2);
}

.emoji-rating span.selected {
    opacity: 1;    /* Emojis ficam totalmente visíveis quando selecionados */
    transform: scale(1.2);  /* Aumentam um pouco de tamanho */
}

.modal-footer {
    text-align: center;
    margin-top: 20px;
}

#sendFeedback {
    cursor: pointer;
    padding: 10px 20px;
    background-color: #05c46b;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    width:100%;
    font-weight:600;
}
    #sendFeedback:hover {
        background-color: #04b361;

    }

.input-error {
    border: 2px solid red;
}

.error-message {
    color: red;
    display: none;
    font-size: 14px;
    margin-top: 5px;
}
        `;
    const output = cleaner.minify(css);

    if (output.errors.length > 0) {
        console.error('Minification errors:', output.errors);
    } else {
        res.write(output.styles.replace(/`/g, "\\`"))

    }

    res.end()
})


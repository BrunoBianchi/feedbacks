/*
  Warnings:

  - You are about to drop the column `creratedAt` on the `Feedback` table. All the data in the column will be lost.
  - The `form` column on the `Website` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "creratedAt";
ALTER TABLE "Feedback" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "css" STRING NOT NULL DEFAULT '.form { background-color: rgba(255, 255, 255, 0.9); color: black; padding: 15px; border-radius: 8px; width: 100% !important; height: 400px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); } .title { display: flex; justify-content: space-between; width: 100% !important; font-size: 14px; margin-bottom: 10px; } .close-btn { cursor: pointer; font-size: 14px; font-weight: bold; color: black; } .body { width: 100%; } .label { font-size: 12px; margin-top: 10px; display: block; } .input, .textarea { display: block; width: 100% !important; border-radius: 3px; background-color: white; border: 1px solid rgb(218, 218, 218); padding: 8px; font-size: 12px; margin-bottom: 10px; box-shadow: none; outline: none; } .textarea { height: 60px; resize: vertical; } .emoji-rating { display: flex; justify-content: space-between; width: 100%; padding: 10px 0; } .emoji { font-size: 20px; cursor: pointer; padding: 0 5px; opacity: 0.5; transition: transform 0.3s, opacity 0.3s; } .emoji:hover, .emoji.selected { opacity: 1; transform: scale(1.2); } .modal-footer { text-align: center; width: 100%; } .button { cursor: pointer; padding: 8px 16px; background-color: #05c46b; color: white; border: none; border-radius: 5px; font-size: 14px; width: 100%; font-weight: 600; } .button:hover { background-color: #04b361; }';
ALTER TABLE "Website" DROP COLUMN "form";
ALTER TABLE "Website" ADD COLUMN     "form" STRING[] DEFAULT ARRAY['<div class=''title''><span>Your Feedback is crucial ❤</span><span class=''close-btn''>X</span></div>', '<div class=''body''><label for=''emailInput''>Email</label><input type=''text'' id=''emailInput'' placeholder=''Your email...'' value=''this.test@gmail.com''></div>', '<div class=''body''><label for=''feedbackInput''>Feedback</label><textarea id=''feedbackInput'' placeholder=''Please write your feedback here...''></textarea></div>', '<div class=''emoji-rating''><span data-value=''1''>😔</span><span data-value=''2''>😐</span><span data-value=''3''>😊</span><span data-value=''4''>😁</span><span data-value=''5''>🤩</span></div>', '<div class=''modal-footer''><button>Send Feedback</button></div>']::STRING[];

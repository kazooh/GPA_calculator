"use client";

import { useState } from "react";
import "./score_and_credit.css";

type Props = {
    subjectCount: number;
};

export default function ScoreAndCreditForm({ subjectCount }: Props) {
    const [scores, setScores] = useState<string[]>(Array(subjectCount).fill(""));
    const [credits, setCredits] = useState<string[]>(Array(subjectCount).fill(''));

    const handleScoreChange = (index: number, value: string) => {
        const updated = [...scores];
        updated[index] = value;
        setScores(updated);
    };

    const handleCreditChange = (index: number, value: string) => {
        const updated = [...credits];
        updated[index] = value;
        setCredits(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const scoreNumbers = scores.map((s)=>Number(s));
        const creditNumbers = credits.map((c)=>Number(c));
        console.log("Scores:", scores);
        console.log("Credits:", credits);
    };

return (
    <form onSubmit={handleSubmit} className="score-form">
      <h2>各科目の点数と単位数を入力してください</h2>
      {Array.from({ length: subjectCount }).map((_, i) => (
        <div key={i} className="score-row">
          <label>科目 {i + 1}</label>
          <div className="input-group">
            <label className="input-label">
                点数: 
                <input
                    type="number"
                    min="0"
                    max="100"
                    value={scores[i]}
                    onChange={(e) => handleScoreChange(i, e.target.value)}
                    placeholder="例: 100"
                    required
                />
          </label>
          <label className="input-label">
            単位: 
            <input
                type="number"
                min="1"
                max="10"
                value={credits[i]}
                onChange={(e) => handleCreditChange(i, e.target.value)}
                placeholder="例: 2"
                required
            />
          </label>
        </div>
    </div>
      ))}
      <button type="submit" className="submit-button">計算する</button>
    </form>
  );
}
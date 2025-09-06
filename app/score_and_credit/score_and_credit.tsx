"use client";

import { useState } from "react";
import "./score_and_credit.css";

type Props = {
  subjectCount: number;
};

// 点数から GPA に変換する関数
function scoreToGPA(score: number): number {
  if (score >= 90) return 4.0;
  if (score >= 85) return 3.5;
  if (score >= 80) return 3.0;
  if (score >= 75) return 2.5;
  if (score >= 70) return 2.0;
  if (score >= 65) return 1.5;
  if (score >= 60) return 1.0;
  return 0.0; // 60未満は不可
}

// 複数科目のデータから GPA と平均点を計算する関数
function calculateResults(scores: number[], credits: number[]) {
  let totalCredits = 0;
  let totalWeightedGPA = 0;
  let totalWeightedScore = 0;

  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    const credit = credits[i];
    const gpa = scoreToGPA(score);

    totalCredits += credit;
    totalWeightedGPA += gpa * credit;
    totalWeightedScore += score * credit;
  }

  const gpaResult = totalWeightedGPA / totalCredits;
  const avgScore = totalWeightedScore / totalCredits;

  return { gpa: gpaResult, average: avgScore };
}

export default function ScoreAndCreditForm({ subjectCount }: Props) {
  const [scores, setScores] = useState<string[]>(Array(subjectCount).fill(""));
  const [credits, setCredits] = useState<string[]>(Array(subjectCount).fill(""));
  const [result, setResult] = useState<{ gpa: number; average: number } | null>(null);

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
    const scoreNumbers = scores.map((s) => Number(s));
    const creditNumbers = credits.map((c) => Number(c));

    const res = calculateResults(scoreNumbers, creditNumbers);
    setResult(res); // 結果を state に保存
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
      <button type="submit" className="submit-button">
        計算する
      </button>

      {/* 結果の表示部分 */}
      {result && (
        <div className="result-box">
          <p>GPA: {result.gpa.toFixed(2)}</p>
          <p>平均点: {result.average.toFixed(2)}</p>
        </div>
      )}
    </form>
  );
}

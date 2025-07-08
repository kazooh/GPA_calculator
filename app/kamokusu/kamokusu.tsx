"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "./kamokusu.css";

export const SubjectInput=()=> {
  const [subjectCount, setSubjectCount] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/score_and_credit?count=${subjectCount}`)
  };

  return (
    <div className="container">
      <h1 className="title">GPA計算機</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="count" className="label">
          科目数を入力してください
        </label>
        <input
          id="count"
          type="number"
          min="1"
          value={subjectCount}
          onChange={(e) => setSubjectCount(e.target.value)}
          className="input"
          placeholder="例：5"
          required
        />
        <button type="submit" className="button">
          次へ
        </button>
      </form>
    </div>
  );
}

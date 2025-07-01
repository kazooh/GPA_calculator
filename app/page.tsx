"use client";

import { useState } from 'react';

export default function Home() {
  const [subjectCount, setSubjectCount] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`科目数: ${subjectCount}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">GPA計算機</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="count" className="block mb-2">科目数を入力してください：</label>
        <input
          id="count"
          type="text"
          value={subjectCount}
          onChange={(e) => setSubjectCount(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          次へ
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState } from 'react';
// コンポーネントで値を保持したい時に使う
// 例えば
// ・入力フォームの値を保持したい
// ・ボタンを押すとカウントアップするようにしたい
// ・状態によって表示を変えたい（計算結果を出したいときなど）
import { useRouter } from 'next/navigation';
// ページ遷移を行いたとき
import "./kamokusu.css";

export const SubjectInput=()=> {
// const SubjectInput = () => {}で関数SubjectInputを定義
// exportを付けることで他のファイルでもこの関数を使えるようにする
// Reactではアロー関数が一般的
  const [subjectCount, setSubjectCount] = useState<string>("");
// subjectCountは現在の状態の値を保持する状態変数
// setSubjectCountは状態を更新するための関数
// useState<string>("")で初期値を空文字に設定
  const router = useRouter();
// 変数routerにルータオブジェクトを代入, これをすることでrouter.push(...)によりプログラムで別のページへ移動することができる

  const handleSubmit = (e: React.FormEvent) => {
// React.FormEventは型
    e.preventDefault();
// ページの再読み込みを防ぐ（入力内容が消えないようにするため）
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
}//
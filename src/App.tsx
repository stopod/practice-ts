import React from "react";
import "./App.css";
import Data from "./data.json";
import TestComponent from "./TestComponent";

// jsonをtypeofで型推論できる
type USERS = typeof Data;

// 型がhelloになる-> リテラル、この場合は文字列リテラル
const name = "hello";
// [変数名]: [型]←アノテーション 基本的には型推論されるので記載しなくても大丈夫
let username: string = "hello";
let dummNum: number = 2;
let bool: boolean = true;
let array1 = [true, true, false];
let array3 = [true, true, 100];
const array2 = [true, true, false];

// objの型はinterfaceで定義する
interface NAME {
  first: string;
  last?: string | null; // null, undefined許容
}

let nameObj: NAME = {
  first: "sample",
  last: "name",
};

let nameObj2: NAME = {
  first: "sample",
};

let nameObj3: NAME = {
  first: "sample",
  last: null,
};

// 関数も型を推論してる
const func1 = (x: number, y: number): number => {
  return x + y;
};

// Intersection Types
type PROFILE = {
  age: number;
  city: string;
};

type LOGIN = {
  username: string;
  password: string;
};

type USER = PROFILE & LOGIN;

const userA: USER = {
  age: 10,
  city: "nagoya",
  username: "sample",
  password: "pass",
};

// Union Types
let value: boolean | number;
value = true;
value = 10;

let arrayUni: (number | string)[];
arrayUni = [0, 1, "a", "b"];

// Literal Types
let company: "Facebook" | "Google" | "Amazon"; // 文字列リテラル, Union Typesを使ってる
company = "Google";

let memory: 256 | 512;
memory = 256;

// typeof 宣言済の型を取得する
let msg: string = "sample";
let msg2: typeof msg;
msg2 = "hoge";

let animal = {
  cat: "smallcat",
};
let newAnimal: typeof animal = {
  cat: "bigcat",
};

// keyof keyを文字列リテラルでとる
type KEYS = {
  primary: string;
  secondary: string;
};

let key: keyof KEYS;
key = "secondary";

// typeof + keyof
const SPORTS = {
  soccer: "Soccer",
  baseball: "Baseboll",
};

let keySports: keyof typeof SPORTS;
keySports = "soccer"; // objからkeyをとって文字列リテラル型にしてるのね

// enum (列挙型)
enum OS {
  Windows,
  Mac,
  Linux,
}

interface PC {
  id: number;
  OSType: OS;
}
const PC1: PC = {
  id: 1,
  OSType: OS.Windows,
};

// 型の互換性
const comp1 = "test";
let comp2: string = comp1; // 抽象度の高い型に対して具体を入れることは可能、反対は無理

let funcComp1 = (x: number) => {};
let funcComp2 = (x: string) => {};
// funcComp1 = funcComp2; × 引数の型が異なるので入れられない

// Generics <> <-ジェネリックス T, U <- エイリアス
interface GEN<T> {
  item: T;
}

const gen0: GEN<string> = {
  item: "hello",
};

// デフォルトの型がstringとなる
interface GEN1<T = string> {
  item: T;
}

// extendsで型の引数を制限できる
interface GEN2<T extends string | number> {
  item: T;
}

const gen4: GEN2<string> = {
  item: "hello",
};

function funcGen<T>(props: T) {
  return { item: props };
}
const gen6 = funcGen<string>("test");
const gen7 = funcGen<string | null>(null);

function funcGen1<T extends string | null>(props: T) {
  return { value: props };
}
const gen8 = funcGen1("hello");
const gen9 = funcGen1(null);

interface Props {
  price: number;
}
function funcGen3<T extends Props>(props: T) {
  // funcGen3_と比べて、こちらはジェネリックを使っているので、引数の型がPropsでなくてもPropsを拡張した型でも受け取ることが可能
  return { value: props.price };
}

function funcGen3_(props: Props) {
  // Propsしか受け取れない
  return { value: props.price };
}

const gen10 = funcGen3({ price: 10, other: 10 });
const gen11 = funcGen3_({ price: 10 });

const funcGen4 = <T extends Props>(props: T) => {
  return { value: props.price };
};

// React.FC <- functional componentの略らしい
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent text={"sample"} />
      </header>
    </div>
  );
};

export default App;

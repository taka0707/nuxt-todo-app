# アプリケーション

> nuxt-todo-app

## 概要

- vue.js、nuxt.jsの学習の為に作成
- todo（タスク）の登録・管理アプリケーション

## 使用方法

- 画面左側の入力フォームよりtodoを登録
- 画面右側に登録されたtodoが表示される
- 表示されている各todoを更新・削除できる

## DEMO

#### 

![nuxt-app demo#1](https://user-images.githubusercontent.com/66991723/153562552-37aae517-c781-46ba-a39d-13477412184e.gif)

![app-nuxt demo](https://user-images.githubusercontent.com/66991723/153589170-47223621-24f4-4b01-b019-38172fe9ddac.gif)


## 環境構築

- Webブラウザ Google Chromeをインストール
※Google Chrome以外のブラウザでは動作確認をしていません。
- node.js 14.4.0をインストール
- firebaseを利用してdb作成（firebaseを利用するにはGoogleアカウント作成が必要）
  - [firebase](https://firebase.google.com/?hl=ja)
  - [firebase料金](https://firebase.google.com/pricing?hl=ja)
  - firebaseで任意のプロジェクトを作成する
  - 作成したプロジェクトからFirestore Databaseを選択 → databaseを作成する（テストモードを選択して作成）

- Githubからプロジェクトをクローン
  - 任意のディレクトリで下記コマンドを実行


``` bash

git clone https://github.com/taka0707/nuxt-todo-app

```

- .envファイルに環境変数を設定
  - nuxt-todo-appディレクトリに移動して下記コマンドを実行


``` bash

echo "FIREBASE_PROJECT_ID = '{自分のFirebaseのプロジェクトID}'" > .env


```

- npmインストールしてlocalhost:3000で画面表示

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

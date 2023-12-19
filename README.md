README の使い方 1.変更内容の記載
例　 sorce batch
print("Hello World") print("Good night World") 2.参考 Web サイトのリンクの貼り付け先
例　デザイン参考元 https://www.nintendo.co.jp/index.html 3.バグの内容
例　 Exception in thread "main" java.lang.NullPointerException 　このバグで困ってます～！ 4.提案、疑問点
例　こうしたほうがいいんじゃないか？　みたいな？ 5.やってほしいこと、仕事内容
　仕事内容も記載するんで、これ見て作業してくださいな～

共有の gmail tchat1211@gmail.com
パスワード t-chat1211??

----Firebase Configration----
const firebaseConfig = {
apiKey: "AIzaSyARxI5dZXILhMkMDTDE5MyK88yJlCh-A_Y",
authDomain: "t-chat-d4c62.firebaseapp.com",
projectId: "t-chat-d4c62",
storageBucket: "t-chat-d4c62.appspot.com",
messagingSenderId: "276479107458",
appId: "1:276479107458:web:329742b4d052a975d16f9b",
measurementId: "G-WPZGDY4H0F"
};

---- AWS コンソールログイン-----
https://056445715636.signin.aws.amazon.com/console

----AWS Dynamodb----
パーティションキー ソートキー
ログイン機能 SystemType :Login Id
質問機能 SystemType :Quetion UserID UserID QuetionID Quetion
通知機能 SystemType :Notification ???

-----コーディングルール-----
・分かりにくい変数名を使わない
例 int a = 0 NG 　 int number = 0 OK
・参考にした Web サイトを記載すること

-----やらなきゃいけないこと--------
富岡　システム概要図
水野　画面レイアウト
山本　画面遷移図(DB があれば テーブル定義書、ER 図)
富岡　進捗共有(Bitrix24 内)
保留　プログラム完成ソース
保留　操作説明書 卒展説明用 A4 1 枚
保留　アプリ説明動画(3 分)限定公開 URL
保留　卒業制作展用パネル
山本　 WBS

水野　ホーム画面作成
富岡　投稿画面作成
山本　質問画面作成

現状データベースを実装していないため、プロトタイプを作ってほしい　データベースを使用せず仮に値を振り動作するかどうか確かめる

山本　 Home 画面の main タグ内にある Class Box の要素数を可変にする　現状は三つの Box があるが投稿した数によって表示する数が変わらなければならない

富岡　 main タグ内にあるスクロールバーの改修　画面端を radius により丸くしたことがおそらく原因の不具合　枠内に収まるように改修して欲しい

富岡　済　回答数を表示する　現状 Home,Question 画面のレイアウトの Class Box 内右下にある回答数が表示されていない

山本　画面遷移の制御ができていない　まずは簡単な投稿画面やホーム画面などの遷移から　最終的には各タグや、質問に沿ったリンク先へ飛ばすべき　この方法はパラメータで飛ばすべきなのではないかと考える

山本　投稿の検索機能の実装　投稿を調べる、タグから調べることができる機能の実施　完全一致ではなく部分一致の方が良

富岡　済　ログイン機能　ログインする際に Google アカウントのログイン画面に遷移させる　そのアカウントがログインされたら、ログインボタンを Google アカウントのアイコンに置き換える

富岡　プレビュー機能　現在編集している投稿内容がどのように載るか見れるようにする機能　理想は画像の埋め込み(README 下記のような)をできるようにする　見出しを作るための識別子 例： ### 質問したいこと ### 左のように###で囲うと H1 のように表示され、見出しと認識される

Quetion 画面の画面左側の要素を押すことで投稿されている未回答、未解決、解決タグの絞り込みができるようになる機能　だがこの機能は Class Box が可変になったら作業開始

タグ自体を追加する機能がいる？　あとでいい

動的サイト、静的サイトの切り分け 現在は S3 に入れて動かしているが、将来ログイン機能を実装するにあたり動的になる可能性あり　要調査

ログイン機能　一人一人のユーザが識別されていないと誰が投稿したのか、その質問は解決できたのかというのがわからないままになってしまう

富岡　済　通知機能　最悪なくてもいいが質問に対して、回答がわかれば便利かな

投稿日、回答日を表示する　そのままの意味

プライベートな相談をするための投稿フォーマット　投稿フォームのフォーマットの欄に先生へ相談するためのフォーマットを追加して、選択された場合はその投稿は個人的な相手にしか見れなくなる

動的サイトの導入　利用者によって表示する画面を変えるのなら動的な動作に対応したサーバー構築を行わなければならない

Dynamodb の導入　最優先事項　これを導入しない限り掲示板の投稿機能やタグの情報を入れることもできない　なにもかもできない
キーバリュー型の DB なので Cloud FireStore と使用感は似ている
どのようにデータを格納するか考える必要もある

ソースコードの Lambda への移行　必要事項　最終的にはサーバーで動作させなければならない

ChatGPT の学習　 Lex を使用し、会話フローを成り立たせる　追加初期のメッセージの考案(定型文)もしなければならない　質問内容のできる限りのブラッシュアップもしておきたい　キーワードを指定してもらう必要がある？

LINE Chatbot のリッチメニュー作成
リッチメニューの中に質問するためのサイトへ飛ばしてあげたほうがいいのではないかと思う　そうなると携帯用の画面も必要？
アイコン、リッチメニューのデザインも考えなければならない
ラベルの追加も可能なため何を使うか考える

パスワード、メアド、ユーザー名の正規表現

S3 にファイルのアップロードを行う　でなければ AWS で動作しない

API Gateway の正しいイベントの設定

DB 絶対完成

CloudWatch の管理

----Web Design 参考集 -----
Q&A ボタン
・灰
https://copypet.jp/codedescription/960/
・カテゴリ分け
https://copypet.jp/codedescription/962/
・オレンジ
https://copypet.jp/codedescription/961/

Q＆A 　 T-CHAT ホーム画面デザイン (未完成)
Font Arial Black,Arial,BIZ UDP ゴシック
![T-CHAT Home Screen](https://github.com/MizunoRoid/T-CHAT/assets/118154286/c366e71d-9630-4b03-8ad5-565c71652edd)

![T-CHAT_Answer_Screen](https://github.com/MizunoRoid/T-CHAT/assets/118154286/6b5414a9-c795-4113-bbf0-d3bebee0813b)

![T-CHAT_Screen_Design](https://github.com/MizunoRoid/T-CHAT/assets/118154286/1c009915-5a46-4bb9-a130-b4b56d051e36)

![T-CHAT_Question_Screen](https://github.com/MizunoRoid/T-CHAT/assets/118154286/2a80f00d-9e46-40eb-accf-da0a337f21dc)

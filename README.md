README の使い方 1.変更内容の記載
例　 sorce batch
print("Hello World") print("Good night World") 2.参考 Web サイトのリンクの貼り付け先
例　デザイン参考元 https://www.nintendo.co.jp/index.html 3.バグの内容
例　 Exception in thread "main" java.lang.NullPointerException 　このバグで困ってます～！ 4.提案、疑問点
例　こうしたほうがいいんじゃないか？　みたいな？ 5.やってほしいこと、仕事内容
　仕事内容も記載するんで、これ見て作業してくださいな～

サーバーアドレス https://mz-server-tr.com/T-CHAT/T-CHAT-Home.html
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
{
UserRegister(Collection)
documentID(ランダムな値)(Document)
MailAddress(Field)PassWord(Filed)UserName(Field)
}
{
Post(Collection)
PostID(ランダムな値)(Document)
Content(投稿内容)(Filed)Format(投稿フォーマット)(Filed)PostDay(投稿日)(Filed)Tag(投稿に付与されるタグ)(Field)Title(投稿のタイトル)(Field)UserID(PostID と同じ値 一意にするために使用)UserName(UserRegister のユーザ名)View(ユーザーの投稿ごとの View 数格納)Answer(SubCollection)
}
{
Trend(Collection)
Tag 名(Document)
View(Post ので記録された View 数を加算)(Field)
}

現在のアプリのフローとしては ①T-CHAT-Home.html を起動する。②T-CHAT-Temp.html に遷移する。その際に url パラメータにクリックした投稿の PostID(Post の中にあるドキュメント ランダムな値で一意)が付与される ③url パラメータ PostID とコレクション Post のドキュメント名とが合致するものを探し出して、その投稿内容を表示

---- AWS コンソールログイン-----
https://056445715636.signin.aws.amazon.com/console

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

プライベート、Q&A、意見交換をフォーマットを完成させる

プライベート-数字を含まない、triden.ac.jp を含んだ人にのみ投稿を見せるのを許可
プライベート、Q&A、意見交換は冒頭にタグを追加する。

複数の HTML タグを使用を出来るようにする <h3><li></li></h3>のような

Trend を押した際にタグと同じように url パラメータに追加、そして投稿を並び替える
1.Trend の要素をクリック 2.パラメータに tag=(クリックした要素を追加)
2.5 できれば並び変えて Firebase の値を再取得、再描画されるまで待つ 3.投稿を並び替える

タグの追加
Post.html を変更することで、タグの種類を増やす。

全デザインの再改修

Question に Home のソースコードを適応する
Question に Treand 機能を抜いたソースコードを抜いて、未回答、未解決、未回答、全表示のボタンの処理を追加する。

コメントに対してコメントをできるようにする

Post の null ガード　何も入力、選択されていない場合、表示しない

Header のみ一度クリックしなければ使えない
一度画面をクリックした判定にする必要がある

通知機能

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

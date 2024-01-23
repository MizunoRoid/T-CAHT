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

山本　画面遷移の制御ができていない　まずは簡単な投稿画面やホーム画面などの遷移から　最終的には各タグや、質問に沿ったリンク先へ飛ばすべき　この方法はパラメータで飛ばすべきなのではないかと考える

山本　投稿の検索機能の実装　投稿を調べる、タグから調べることができる機能の実施　完全一致ではなく部分一致の方が良

Quetion 画面の画面左側の要素を押すことで投稿されている未回答、未解決、解決タグの絞り込みができるようになる機能　だがこの機能は Class Box が可変になったら作業開始

プライベートな相談をするための投稿フォーマット　投稿フォームのフォーマットの欄に先生へ相談するためのフォーマットを追加して、選択された場合はその投稿は個人的な相手にしか見れなくなる

LINE Chatbot のリッチメニュー作成
リッチメニューの中に質問するためのサイトへ飛ばしてあげたほうがいいのではないかと思う　そうなると携帯用の画面も必要？
アイコン、リッチメニューのデザインも考えなければならない
ラベルの追加も可能なため何を使うか考える

パラメータの暗号化　 URL の末尾にユーザー名や、タグ名を追加するため脆弱性あり

ChatGPT のロールを編集する　条件トライデントコンピュータ専門学校　講師　就職の情報や、学内の情報、アプリ開発の役立つ情報を教えてくれるくれる

携帯画面の実装　 Header を検索のみに絞る　 Header 下部は投稿内容だけに絞る

htmlspecialchars の追加　
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

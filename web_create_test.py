<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>企業のウェブサイト</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <nav>
        <ul>
            <li><a href="#about">会社概要</a></li>
            <li><a href="#services">サービス</a></li>
            <li><a href="#contact">コンタクト</a></li>
        </ul>
    </nav>
</header>

<section id="about">
    <h1>会社概要</h1>
    <p>ここに会社の紹介文が入ります。</p>
</section>

<section id="services">
    <h2>サービス</h2>
    <p>提供しているサービスについての説明。</p>
</section>

<section id="contact">
    <h2>お問い合わせ</h2>
    <form>
        <input type="text" id="name" name="name" placeholder="お名前">
        <input type="email" id="email" name="email" placeholder="メールアドレス">
        <textarea id="message" name="message" placeholder="メッセージ"></textarea>
        <button type="submit">送信</button>
    </form>
</section>

<footer>
    <p>&copy; 2023 企業名. All rights reserved.</p>
</footer>

</body>
</html>
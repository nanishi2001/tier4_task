# Tier4_Task

## テスト設計

[TIER IV ACCOUNT](https://account.tier4.jp/login)を今回のE2Eテストの対象とする。
そのシステムが持つ主要な機能のうちログイン機能をテストする。
今回は下記の5種類をテストケースとして作成する。

- ログイン機能
- 空入力に伴うバリデーション
- ユーザー名間違い、パスワード間違いに伴うバリデーション
- Sign upを押下時の遷移
- forgot password?を押下時の遷移

また、今回テストする環境はwebkitとsafari、firefox以外とする。

## 注意点

ログイン情報は[src\JSON\login_setting.JSON](src\JSON\login_setting.JSON)を自身で作成し、格納するものとする。
形式は下記を参照すること。

```JSON
{
	"identifier": "your_identifier",
	"password": "your_password" 
}
```

## 使用方法

前提としてNodeJSはダウンロードしているものとする。
下記コードを実行するとpackage.jsonに基づいた依存関係にあるライブラリをインストールし、実行環境を整えてくれる。

```bush
npm install
```

また、上の注意点でも記載したようにログイン情報を[src\JSON\login_setting.JSON](src\JSON\login_setting.JSON)に指定の形式で作成すること。
今回作成したPlaywrightを利用したGUIでのテスト画面は下記コードを実行すると立ち上がるようになっている。

```bush
npm run test:tier4
```

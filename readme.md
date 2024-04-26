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

また、今回テストする環境はweb kitとsafari以外とする。

## 注意点

ログイン情報は[src\JSON\login_setting.JSON](src\JSON\login_setting.JSON)に格納するものとする。

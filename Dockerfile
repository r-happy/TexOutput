# ベースイメージとしてNode.jsを指定
FROM node:18-alpine

# pnpmをインストール
#RUN npm install -g pnpm

# 作業ディレクトリの作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsアプリをビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "start"]


# 🏗 Setup
1. First of all need compile TDLib (Telegram Database library). Go to this [repo](https://github.com/jeudesprits/tg-time-tdlib-build-docker)
1. Clone this repo: `git clone https://github.com/jeudesprits/tg-time`
2. Go to folder: `cd tg-time`
3. Create `lib` folder: `mkdir lib` and copy your `libtdjson.{so/dylib}` file here
4. Build docker container: `docker build --tag=jeudesprits/tg-time .`
5. Run docker container: `docker run -it -e "NODE_ENV=production" --name "tg-time jeudesprits/tg-time:latest"`
6. Answer the questions(phone number and secret code)
7. Press `Control+P Control+Q`
8. PROFIT!

# 👨‍💻 Author 
[jeudesprits](https://t.me/jeudesprits)

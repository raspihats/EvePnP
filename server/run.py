from gevent import monkey
monkey.patch_all()

if __name__ == "__main__":
    from app import run_app
    run_app()

from flask import current_app as app


def get_heads_list():
    return app.config['MACHINE_CONFIG']['heads']


def get_head(id):
    for head in get_heads_list():
        if head['id'] == id:
            return head
    return None

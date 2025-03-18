from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/snake')
def snake():
    return render_template('snake.html')

@app.route('/pinball')
def pinball():
    return render_template('pinball.html')

@app.route('/buscaminas')
def buscaminas():
    return render_template('buscaminas.html')

if __name__ == '__main__':
    app.run(debug=True)
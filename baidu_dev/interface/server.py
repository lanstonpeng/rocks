from flask import Flask
from flask import render_template
from flask import request
import re
app = Flask(__name__,static_folder="static")

def getPara(sType):
    return request.args.get(sType)

def searchPara(sType,content):
    return re.search("(?<={" + sType +"}:).*",content).group(0)

@app.route('/')
def formatFile():
    f = open("interface.data","r")
    content = f.read()
    f.close()
    groupon = searchPara("groupon",content)
    groupon_more = searchPara("groupon_more",content) 
    movie = searchPara("movie",content) 
    movie_more = searchPara("movie_more",content)
    food = searchPara("food",content) 
    food_more = searchPara("food_more",content)
    hotel = searchPara("hotel",content) 
    hotel_more = searchPara("hotel_more",content)
    taxi = searchPara("taxi",content) 
    return render_template('index.html',groupon=groupon, groupon_more =
            groupon_more,movie=movie,movie_more=movie_more,food=food,
            food_more=food_more,hotel=hotel,hotel_more=hotel_more,taxi=taxi)


@app.route('/saveass')
def writeFile():
    groupon = getPara("groupon")
    groupon_more = getPara("groupon_more")
    movie = getPara("movie")
    movie_more = getPara("movie_more")
    food = getPara("food")
    food_more = getPara("food_more")
    hotel = getPara("hotel")
    hotel_more = getPara("hotel_more")
    taxi = getPara("taxi")
    f = open("interface.data","w")
    f.write("{groupon}:" + groupon  + "\n")
    f.write("{groupon_more}:" + groupon_more  + "\n")
    f.write("{movie}:" + movie+ "\n")
    f.write("{movie_more}:" + movie_more + "\n")
    f.write("{food}:" + food+ "\n")
    f.write("{food_more}:" + food_more + "\n")
    f.write("{hotel}:" + hotel+ "\n")
    f.write("{hotel_more}:" + hotel_more + "\n")
    f.write("{taxi}:" + taxi + "\n")
    f.close()
    return "done"

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')


const express = require('express');
const bodyParser = require("body-parser"); 

const app = express();
const PORT = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(require('path').join(__dirname, 'public')));

app.set("view engine", "ejs");
app.engine('html', require('ejs').renderFile);

app.get("/", function (request, response){
    response.sendFile(__dirname+'app\\index.html');
});

app.post("/result", urlencodedParser, function (request, response) {
    var anime = 0;
    var latent = 0;
    var anti = 0;
    var antiLatent = false;
    var data = request.body;
    if (data["1"]==11) { anime+=2; latent+=2; }
    if (data["1"]==13) { anti--; anime++; }
    if (data["1"]==14) { anti++; anime++; }
    if (data["2"]==21) anti++;
    if (data["2"]==22) anime++;
    if (data["2"]==23) anime+=2;
    if (data["2"]==24) latent++;
    if (data["3"]==31) anti++;
    if (data["3"]==32) anime++;
    if (data["3"]==33) anime+=2;
    if (data["3"]==34) latent++;
    if (data["4"]==41) { anime+=3; anti-=2; }
    if (data["4"]==42) { anime++; anti--; }
    if (data["4"]==43) { anime++; anti++; }
    if (data["4"]==44) { anime--; anti+=2; }
    if (data["4"]==45) latent++;
    if (data["5"]==51) latent++;
    if (data["5"]==53) { anime++; anti--; }
    var buf = 0.0;
    if (data["6"]==undefined) latent++;
    else {
        if (data["6"].indexOf("61")!=-1) buf+=0.2;
        if (data["6"].indexOf("62")!=-1) buf+=0.2;
        if (data["6"].indexOf("63")!=-1) buf+=0.2;
        if (data["6"].indexOf("64")!=-1) buf+=0.2;
        if (data["6"].indexOf("65")!=-1) buf+=0.2;
        if (data["6"].indexOf("66")!=-1) buf+=0.2;
        if (data["6"].indexOf("67")!=-1) buf+=0.4;
        if (data["6"].indexOf("68")!=-1) antiLatent = true;
        if (data["6"].indexOf("69")!=-1) buf+=1;
        if (data["6"].indexOf("610")!=-1) buf6=1;
        if (data["6"].indexOf("611")!=-1) buf6=1;
        if (data["6"].indexOf("612")!=-1) buf6=1;
        if (data["6"].indexOf("613")!=-1) buf6=1;
    }
    buf = Math.round(buf);
    anime+=buf;
    if (data["7"]==71) latent++; 
    if (data["7"]==72) anti--; 
    if (data["7"]==73) anime++;
    if (data["7"]==74) { anti--; anime+=2; }
    if (data["8"]==81) { anime--; anti++; }
    if (data["8"]==82) anime++;
    if (data["8"]==83) anime+=2;
    if (data["8"]==84) anime+=3;
    if (data["8"]==85) latent++;
    if (data["9"]==91) latent++; 
    if (data["9"]==92) anti++; 
    if (data["9"]==93) { anti++; anime++; }
    if (data["9"]==94) anime++;
    if (data["10"]==101) latent++; 
    if (data["10"]==103) anime++;
    buf = 0.0;
    if (data["11"]==undefined) latent++;
    else {
        if (data["11"].indexOf("111")!=-1) buf+=0.4;
        if (data["11"].indexOf("112")!=-1) buf+=0.2;
        if (data["11"].indexOf("113")!=-1) buf+=0.2;
        if (data["11"].indexOf("114")!=-1) buf+=0.2;
        if (data["11"].indexOf("115")!=-1) buf+=0.2;
        if (data["11"].indexOf("116")!=-1) buf+=1;
        if (data["11"].indexOf("117")!=-1) buf+=1;
        if (data["11"].indexOf("118")!=-1) buf+=1;
        if (data["11"].indexOf("119")!=-1) buf+=1;
        if (data["11"].indexOf("1110")!=-1) buf+=0.5;
        if (data["11"].indexOf("1111")!=-1) buf+=0.2;
    }
    buf = Math.round(buf);
    anime+=buf;
    var text;
    if (anime>=anti) 
        text = " Рыночный Анархо-Комиссариат по результатам проведенного тестирования выявил, что вы являетесь анимешником. Направьте результаты тестирования одному из вождей-антианимешников для того, чтобы вам было назначено лечение и соответвующий курс препаратов.";
    else text = " Рыночный Анархо-Комиссариат по результатам проведенного тестирования выявил, что вы являетесь антианимешником. Направьте результаты тестирования однму из вождей-антианимешников, для того чтобы вы присоединились к программе реабилитации и ресоциализации анимешников.";
    if (anime>0 && anti>0)
        text = text + " Не смотря на проведенное тестирование, данная оценка не точна. Рекомендуем перепройти тестирование для уточнения результата. При повторении результата - обратитесь за консультацией к вождю-антианимешнику.";
    if (latent == 1) 
        text = text + " Есть вероятность, что вы не до конца были честны в ответах и вполне возможно, вы на самом деле скрываете что вы анимешник.";
    if (latent == 2 && latent == 3) 
        text = " Рыночный Анархо-Комиссариат по результатам проведенного тестирования выявил, что вы скрываете что являетесь анимешником. Направьте результаты тестирования одному из вождей-антианимешников для того, чтобы вам было назначено лечение и соответвующий курс препаратов.";
    if (latent > 3)
        text = " Рыночный Анархо-Комиссариат по результатам проведенного тестирования выявил, что вы ярый анимешник и специально отвечали на вопросы с целью изобразить их себя врага аниме, но на самом деле вы наверняка его самый пламенный союзник. Направьте результаты тестирования одному из вождей-антианимешников для того, чтобы вам было назначено лечение и соответвующий курс препаратов.";
    if (latent > 0 && anime > 0)
        text = " Рыночный Анархо-Комиссариат по результатам проведенного тестирования выявил, что вы проходили тест нечестно. Просим повторно перепройти тестирование.";
    response.render(__dirname+'app\\result.html', {
        text: text
    });
});

app.listen(PORT);
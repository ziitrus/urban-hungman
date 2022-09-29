class Urban {
  constructor() {
    this.url = "https://api.urbandictionary.com/v0/random"
  }

  get start() {
    chrome.storage.sync.get(r => {
      document.querySelector(".score").innerHTML = r.score + ' / '+ r.party || 0
    })
    return this.random();
  }

  random() {
    let self = this;
    let resultcnt = document.querySelector('.resultCnt');
    return fetch(this.url, {}).then(r => r.json())
      .then(function(res) {
        let red = res.list.reduce((p, c) => {
          return p.thumbs_up > c.thumbs_up ? p : c;
        });
        for (var i = 0; i < red.word.length; i++) {
          let rCase = document.createElement('td');
          rCase.className = "rCase w"
          red.word[i]
          resultcnt.appendChild(rCase);
        }
        let nmb = document.createElement('td')
        nmb.className = "rCase"
        nmb.innerHTML = red.word.length;
        resultcnt.appendChild(nmb);
        self.compare(red);
      }).catch(e => {
        console.log("error")
      })
  }

  display(reduced) {
    let wordCnt = document.querySelector(".word")
    let meaningCnt = document.querySelector(".meaning")
    let linkCnt = document.querySelector(".link")
  }

  filter(character) {
    let reference = "qwertyuiopasdfghjklzxcvbnm";
    if(reference.search(character) === -1) {
      return true;
    } else {
      return false;
    }
  }

  compare(reduced) {
    let p = 0;
    let sp = 0;
    let self = this;
    let word = reduced.word.toLowerCase();
    let rCase = document.querySelectorAll(".rCase")
    let char = document.querySelectorAll('.char');
    let keyboard = Array.prototype.slice.call(document.querySelectorAll('.btn'));
    for (var i = 0; i < word.length; i++) {
      if (self.filter(word[i])) {
        rCase[i].innerHTML = word[i];
        rCase[i].classList.add("specialChar");
      }
    }
    keyboard.map(k => {
      k.addEventListener('click', e => {
        let ele = e.src || e.srcElement;
        if (!ele.classList.contains("btn-primary")) {
          for (var i = 0; i < word.length; i++) {
            if (word[i] === ele.innerHTML) {
              rCase[i].innerHTML = ele.innerHTML;
              rCase[i].classList.add("validate");
              ele.classList.add("btn-primary");
              if(self.checkWin(word))
                self.win(keyboard, reduced)
            }
          }
          if (word.indexOf(ele.innerHTML) === -1) {
            array[p].a = true;
            if (p === 0) {
              var img = document.createElement("img");
              img.src = "assets/urban_thumbs.png";
              img.width = "20";
              char[p].appendChild(img);
            } else {
              char[p].innerHTML = array[p].c;
            }
            ele.classList.add("btn-primary")
            p++;
          }
        }
        p === char.length ? self.loose(keyboard, reduced) : false;
      })
    })
  }

  checkWin(word, kb, rd) {
    let state = false;
    let str = "";
    let self = this;
    let w = Array.prototype.slice.call(document.querySelectorAll(".w"));
    w.map(m => {
      str += m.innerHTML;
      if(str === word) {
        state = true;
      }
    })
    return state;
  }

  win(kb, rd) {
    this.disableKb(kb);
    this.appendInfos(rd, 1);
    chrome.storage.sync.get(r => {
      r.score ++;
      r.party ++;
      this.save(r.score, r.party);
    })
  }

  loose(kb, rd) {
    this.disableKb(kb);
    this.appendInfos(rd, 0);
    chrome.storage.sync.get(r => {
      r.party ++;
      this.save(r.score, r.party);
    })
  }

  appendInfos(rd, state) {
    let container = document.querySelector('.pop');
    let word = document.createElement('h1');
    let mean = document.createElement("p");
    let link = document.createElement("a");


    container.classList.add(state ? "win" : "loose")

    word.innerHTML = state ? "[win] " + rd.word : "[loose] " + rd.word;
    mean.innerHTML = rd.definition;
    link.innerHTML = "Link to the page";
    link.href = rd.permalink;
    link.target = "_blank";

    container.classList.add("actived");

    container.appendChild(word);
    container.appendChild(mean);
    container.appendChild(link);
  }

  save(score,party) {
    chrome.storage.sync.set({
      'score': score || 0,
      'party': party || 0
    });
    document.querySelector(".score").innerHTML = `score / party`
  }

  disableKb(kb) {
    kb.map(k => {
      k.setAttribute("disabled", "")
    })
  }

}

const tablContainer = document.querySelector(".ctbl");

var array = [];

var tabl = document.createElement('table');

var matrix = [
  ['_','_','_','_','_','_'],
  ['|','','/','',{c:"o", a:false},''],
  ['|','/','',{c:"/", a:false},{c:"|", a:false},{c:"\\", a:false}],
  ['|','','','',{c:"|", a:false},''],
  ['|','','',{c:"/", a:false},'',{c:"\\", a:false}],
  ['|','','','','',''],
  ['|','','','','',''],
  ['\\','_','_','_','_','_']
]

matrix.map(m => {
  var row = document.createElement('tr')
  tabl.appendChild(row);
  m.map(i => {
    var column = document.createElement('td');
    row.appendChild(column)
    if (typeof i !== "object") {
      column.innerHTML = i;
    } else {
      column.className = "char"
      array.push(i);
    }
  })
})

tabl.style.width = "100%";

tabl.setAttribute("cellspacing", 0);
tablContainer.appendChild(tabl);

new Urban().start;

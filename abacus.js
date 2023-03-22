let timer, mouseY;

function createNums() {
    let nums = document.getElementsByClassName('nums')[0]
    
    for (let r = 0; r < 9; r++) {
        let num = document.createElement('div')
        num.className = `num ${r}`
        num.innerHTML = "<p>0</p>"
        nums.appendChild(num)
    }
}

function createCounters () {
    let abacus = document.getElementsByClassName('abacus')[0]
    let topSec = document.getElementsByClassName('top')[0]
    let botSec = document.getElementsByClassName('bottom')[0]

    //Top Row
    for (let r = 0; r < 9; r++) {
        let left = -9.9 * r;
        for (let c = 0; c < 2; c++) {
            let ctr = document.createElement('div')
            ctr.className = "c"
            ctr.src = "images/abacus-counter.png"
            ctr.alt = "counter"
            ctr.className += " " + "t" + r + "_" + c;
            let top = 9 * c;
            ctr.style = `top: calc(${top}% + 4.5%); left: calc(${left}% + 85.5%)`
            topSec.appendChild(ctr)
        }
    }
    //Bottom Row
    for (let r = 0; r < 9; r++) {
        let left = -9.9 * r;
        for (let c = 0; c < 5; c++) {
            let ctr = document.createElement('div')
            ctr.className = "c"
            ctr.src = "images/abacus-counter.png"
            ctr.alt = "counter"
            ctr.className += " " + r + "_" + c;
            let top = 9 * c;
            ctr.style = `top: calc(${top}% + 51%); left: calc(${left}% + 85.5%)`
            botSec.appendChild(ctr)
        }
    }

    abacus.addEventListener('mouseover', function(e) {
        mouseY = e.clientY;
    })

    checkCounters()
}

function checkCounters() {
    const counters = document.querySelectorAll('.c')

    counters.forEach(counter => {
        counter.addEventListener('mousedown', function(e) {
            const y = e.clientY - counter.offsetTop
            //moveCounter(counter, y)
            timer = setInterval(function() {moveCounter(counter, y)}, 100);
        })
    })

    document.addEventListener('mouseup', function() {
        clearInterval(timer)
    })
}

function moveCounter(c, y) {
    let m_move = mouseY - c.offsetTop;

    let l = getLocation(c.style.top, c.style.left) //console.log(l)
    let pos = getPosition(c.className) //console.log(pos)

    if (pos.top == true) {
        if (m_move > y) {
            if (pos.row == 0) { //first
                CanMoveDown_T({l, pos}, c)
            } else {
                CanMoveDown_T({l, pos}, c,  true)
            }
        } else if (m_move < y) {
            if (pos.row == 0) { //first
                CanMoveUp_T({l, pos}, c, true)
            } else {
                CanMoveUp_T({l, pos}, c)
            }
        }
    } else {
        if (m_move > y) {
            if (pos.row == 0) { //first
                CanMoveDown({l, pos}, c)
            } else if (pos.row > 0 && pos.row < 4) { //middle
                CanMoveDown({l, pos}, c)
            } else if (pos.row == 4) { //last
                CanMoveDown({l, pos}, c, true)
            }
        } else if (m_move < y) {
            if (pos.row == 0) { //first
                CanMoveUp({l, pos}, c, true)
            } else if (pos.row > 0 && pos.row < 4) { //middle
                CanMoveUp({l, pos}, c)
            } else if (pos.row == 4) { //last
                CanMoveUp({l, pos}, c)
            }
        }
    }
}

function checkLocation(c, pos, l) {

}

function getLocation(t, l) {
    let top = t.substring(t.indexOf("(") + 1, t.indexOf(")"));
    let left = l.substring(l.indexOf("(") + 1, l.indexOf(")"));
    return({top, left})
}

function getPosition(c) {
    let col, row, top;
    if (c.substring(c.indexOf("_") - 2, c.indexOf("_") - 1) == 't') {
        row = c.substring(c.indexOf("_") + 1)
        col = c.substring(c.indexOf("_") - 1, c.indexOf("_"))
        top = true;
    } else {
        row = c.substring(c.indexOf("_") + 1)
        col = c.substring(c.indexOf("_") - 1, c.indexOf("_"))
        top = false;
    }
    return({col, row, top})
}

function moveDown(c, ctr) {
    let y = Number(c.l.top.replace('%', '')) + 2
    ctr.style.top = `calc(${y}%)`
}

function moveUp(c, ctr) {
    let y = Number(c.l.top.replace('%', '')) - 2
    ctr.style.top = `calc(${y}%)`
}

function CanMoveDown(c, ctr, last) {
    last = last || false;
    if (last == true) {
        if (Number(c.l.top.replace('%', '')) <= 86) {
            moveDown(c, ctr)
        }
    } else {
        let pos = `${c.pos.col}_${Number(c.pos.row) + 1}`;
        let c_2 = document.getElementsByClassName(pos)[0]
        let t = c_2.style.top
        let top = t.substring(t.indexOf("(") + 1, t.indexOf(")"));
        let dis = Number(top.replace('%', '')) - Number(c.l.top.replace('%', ''))

        if (dis > 9) {
            moveDown(c, ctr)
        }
    }
}

function CanMoveUp(c, ctr, first) {
    first = first || false;
    if (first == true) {
        if (Number(c.l.top.replace('%', '')) >= 33) {
            moveUp(c, ctr)
        }
    } else {
        let pos = `${c.pos.col}_${Number(c.pos.row) - 1}`;
        let c_2 = document.getElementsByClassName(pos)[0]
        let t = c_2.style.top
        let top = t.substring(t.indexOf("(") + 1, t.indexOf(")"));
        let dis = Number(top.replace('%', '')) - Number(c.l.top.replace('%', ''))
        if (dis < -9) {
            moveUp(c, ctr)
        }
    }
}

function CanMoveDown_T(c, ctr, last) {
    last = last || false;
    if (last == true) {
        if (Number(c.l.top.replace('%', '')) <= 18) {
            moveDown(c, ctr)
        }
    } else {
        let pos = `t${c.pos.col}_${Number(c.pos.row) + 1}`;
        let c_2 = document.getElementsByClassName(pos)[0]
        let t = c_2.style.top
        let top = t.substring(t.indexOf("(") + 1, t.indexOf(")"));
        let dis = Number(top.replace('%', '')) - Number(c.l.top.replace('%', ''))

        if (dis > 9) {
            moveDown(c, ctr)
        }
    }
}

function CanMoveUp_T(c, ctr, first) {
    first = first || false;
    if (first == true) {
        if (Number(c.l.top.replace('%', '')) >= 5) {
            moveUp(c, ctr)
        }
    } else {
        let pos = `t${c.pos.col}_${Number(c.pos.row) - 1}`;
        let c_2 = document.getElementsByClassName(pos)[0]
        let t = c_2.style.top
        let top = t.substring(t.indexOf("(") + 1, t.indexOf(")"));
        let dis = Number(top.replace('%', '')) - Number(c.l.top.replace('%', ''))
        if (dis < -9) {
            moveUp(c, ctr)
        }
    }
}

createCounters()
//createNums()
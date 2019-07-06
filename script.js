function makeBox() {
  var numBox = document.getElementById("kotak")
  var boxes = document.createElement("div")
  boxes.setAttribute("id", "inside-boxes")

//reset the box
  var divTreasure = document.getElementById("treasure-boxes")
  resetBox(divTreasure.id)

//validation
  if(!numBox.value) {
    alert("Masukkan Angka!")
  }else if(numBox.value < 3 || numBox.value > 10) {
    alert("Harus antara 3 sampai 10")
    return false
  } else {
    var announceBox = document.createElement("div")

    var pickABox = document.createElement("h3")
    announceBox.setAttribute("id", "announcer")
    pickABox.innerHTML = "Pick A Box"
    announceBox.appendChild(pickABox)
    divTreasure.appendChild(announceBox)

    var treasure = Math.floor(Math.random() * (numBox.value-1))

    // create number of boxes
    for(var i = 1; i <= numBox.value; i++) {
      var newBox = document.createElement("button")
      newBox.setAttribute("class", "harta-karun")
      newBox.value = i
      newBox.innerHTML = i
      newBox.addEventListener("click", function() {
        kotakPilihan(this.value-1, treasure)
      })
      boxes.appendChild(newBox)
    }
    divTreasure.appendChild(boxes)
  }
}

//function after first pick
function kotakPilihan(pilihan, jackpot) {
  var andaMemilih = document.getElementById("announcer").children
  andaMemilih[0].innerHTML = "Anda memilih box nomor "+ (pilihan+1)
  
  var harta = document.getElementsByClassName("harta-karun")
  
  if(pilihan === jackpot) {
    var anotherRandomBox = Math.floor(Math.random() * (harta.length-1))

    while(anotherRandomBox === jackpot) {
      anotherRandomBox = Math.floor(Math.random() * (harta.length-1))
    }
  }
  for(var i = 0; i < harta.length; i++) {
    if(i === pilihan) {
      harta[i].style.border = "5px solid rgb(195, 0, 0)"
    } 

    if(pilihan !== jackpot) {
      if(i !== pilihan && i !== jackpot) {
        harta[i].style.color = "transparent"
        harta[i].style.background = 'url("images/kosong.png")'
		harta[i].style.cursor = "default"
      }
    } else {
        if(i !== anotherRandomBox && i !== jackpot) {
          harta[i].style.color = "transparent"
          harta[i].style.background = 'url("images/kosong.png")'
		  harta[i].style.cursor = "default"
        }
    }
    harta[i].disabled = true
  }
  var announcer = document.getElementById("announcer")

  var swapBox = document.createElement("h4")
  swapBox.innerHTML = "Apakah anda ingin menukar kotak anda?"
  announcer.appendChild(swapBox)

  var yesBtn = document.createElement("button")
  yesBtn.innerHTML = "YA"
  yesBtn.addEventListener("click", function() {
    wannaSwap(pilihan, jackpot, anotherRandomBox, true)
  })
  announcer.appendChild(yesBtn)

  var noBtn = document.createElement("button")
  noBtn.innerHTML = "TIDAK"
  noBtn.addEventListener("click", function() {
    wannaSwap(pilihan, jackpot, anotherRandomBox, false)
  })
  announcer.appendChild(noBtn)

}

function resetBox(theID) {
  var divTreasure = document.getElementById(theID)
  while(divTreasure.firstChild) {
    divTreasure.removeChild(divTreasure.firstChild)
  }
}

// hide or show the rules
function hideButton() {
  var howPlay = document.getElementById("how-to-play")
  var tombolHidden = document.getElementById("hide-rules")
  if(howPlay.style.visibility === "hidden") {
    howPlay.style.visibility = "visible"
    tombolHidden.innerHTML = "Hide"
  } else {
    howPlay.style.visibility = "hidden"
    tombolHidden.innerHTML = "Show"
  }
}

function wannaSwap(pilihan, jackpot, randNum, tukar) {
  var swapBox = document.getElementById("announcer").children
  for(var i = 1; i < swapBox.length; i++) {
    swapBox[i].style.visibility = "hidden"
  }

  var kotak = document.getElementsByClassName("harta-karun")

  if(pilihan === jackpot) {
    if(tukar) {
      kotak[randNum].style.border = "5px solid rgb(195, 0, 0)"
      kotak[pilihan].style.border = "5px solid rgb(27, 8, 8)"
      swapBox[0].innerHTML = "Selamat Anda Tidak Mendapat Apa-apa"
    } else {
      swapBox[0].innerHTML = "Selamat Anda Mendapatkan Harta Karun"
    }
    kotak[randNum].style.background = "url('images/kosong.png')"
    kotak[randNum].style.color = "transparent"
	kotak[randNum].style.cursor = "default"
  } else {
    if(tukar) {
      kotak[jackpot].style.border = "5px solid rgb(195, 0, 0)"
      kotak[pilihan].style.border = "5px solid rgb(27, 8, 8)"
      swapBox[0].innerHTML = "Selamat Anda Mendapatkan Harta Karun"
    } else {
      swapBox[0].innerHTML = "Selamat Anda Tidak Mendapat Apa-apa"
    }
    kotak[pilihan].style.background = "url('images/kosong.png')"
    kotak[pilihan].style.color = "transparent"
	kotak[pilihan].style.cursor = "default"
  }
  kotak[jackpot].style.color = "transparent"
  kotak[jackpot].style.background = "url('images/treasure.png')"
  kotak[jackpot].style.cursor = "default"
}
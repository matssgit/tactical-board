let team = [];

function schedulePlayer() {
   const position = prompt(
      "Informe a posição que jogador irá atuar (Ex: goleiro, zagueiro, lateral direito, volante, meia, ponta direita, atacante):",
   );
   const name = prompt("Informe o nome do jogador:");
   const number = prompt("Informe o número da camisa do jogador:");
   const photoUrl = prompt(
      "Insira a URL da foto do jogador (ou deixe em branco):",
   );

   if (position === "" || name === "" || number === "") {
      alert("Informações inválidas! Preencha todos os campos.");
      return;
   }

   let confirmation = confirm(
      `Confirma a convocação de ${name} (#${number}) como ${position}?`,
   );

   if (confirmation) {
      const player = {
         position: position.toLowerCase().trim(),
         name: name,
         number: number,
         photo:
            photoUrl || "https://cdn-icons-png.flaticon.com/512/166/166344.png",
      };

      team.push(player);

      let listId = "";

      // Lógica de distribuição para as 5 seções do HTML
      if (player.position === "goleiro") {
         listId = "goalkeepers";
      } else if (
         ["zagueiro", "lateral direito", "lateral esquerdo"].includes(
            player.position,
         )
      ) {
         listId = "defenders";
      } else if (
         ["volante", "primeiro volante", "segundo volante"].includes(
            player.position,
         )
      ) {
         listId = "defensive-midfielders"; // Cai na nova linha de Volantes
      } else if (
         ["meia", "meio campo", "meia atacante"].includes(player.position)
      ) {
         listId = "midfielders"; // Cai na linha de Meias
      } else {
         listId = "forward"; // Atacantes e Pontas
      }

      const list = document.getElementById(listId);
      if (list) {
         const item = document.createElement("li");
         item.id = "Jogador-" + number;

         // Adiciona a classe para o CSS Grid (Ex: lateral-direito, ponta-direita)
         const posClass = player.position.replace(/\s+/g, "-");
         item.classList.add(posClass);

         item.innerHTML = `
            <div class="foto-player">
                <img src="${player.photo}" alt="${player.name}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/166/166344.png'">
            </div>
            <span>${player.name}</span>
         `;
         list.appendChild(item);
      }
   }
}

function removePlayer() {
   const numberToRemove = prompt(
      "Qual o número da camisa do jogador que deseja remover?",
   );
   const playerElement = document.getElementById("Jogador-" + numberToRemove);

   if (playerElement) {
      if (
         confirm(`Remover o jogador de número ${numberToRemove} da escalação?`)
      ) {
         playerElement.remove();
         team = team.filter((p) => p.number !== numberToRemove);
      }
   } else {
      alert("Jogador não encontrado no campo!");
   }
}

function listTeam() {
   if (team.length === 0)
      return alert("Nenhum jogador escalado até o momento.");
   let message = team
      .map((p) => `${p.position.toUpperCase()}: ${p.name} (#${p.number})`)
      .join("\n");
   alert(message);
}

function goToTheMatch() {
   const splash = document.getElementById("splash-screen");
   const container = document.getElementById("container-estadio");
   const h1 = document.querySelector("h1");
   const logo = document.getElementById("logo-3d");

   logo.src =
      "https://i.pinimg.com/originals/c5/f7/59/c5f759084662d2e3752f7f82bc8fa9f7.png";

   splash.style.display = "flex";
   splash.style.opacity = "1";

   setTimeout(() => {
      splash.style.opacity = "0";

      setTimeout(() => {
         splash.style.display = "none";
         h1.style.display = "block";
         container.style.display = "flex";
         document.getElementById("campo").style.display = "grid"; // Ajustado para grid
      }, 800);
   }, 2200);
}

function menuInit() {
   let option = prompt(`
        VESTIÁRIO DA SELEÇÃO
        ---------------------------------
        1 - Escalar um jogador
        2 - Remover um jogador
        3 - Listar convocados 
        4 - IR PARA A PARTIDA`);

   switch (option) {
      case "1":
         schedulePlayer();
         menuInit();
         break;
      case "2":
         removePlayer();
         menuInit();
         break;
      case "3":
         listTeam();
         menuInit();
         break;
      case "4":
         goToTheMatch();
         break;
      default:
         alert("Opção inválida!");
         menuInit();
   }
}

menuInit();

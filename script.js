// Carregar tarefas do localStorage ou usar a lista padrão se não houver nada salvo
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    { title: "Comprar comida para o gato", type: "Urgente" },
    { title: "Consertar Computador", type: "Importante" },
    { title: "Beber água", type: "Normal" },
    { title: "Enviar relatório trimestral", type: "Importante" },
    { title: "Fazer exercícios físicos", type: "Normal" },
    { title: "Agendar consulta médica", type: "Urgente" },
    { title: "Ler pelo menos um capítulo de um livro", type: "Normal" },
    { title: "Limpar a despensa", type: "Importante" },
    { title: "Pagar a conta de energia", type: "Urgente" },
    { title: "Assistir a um documentário interessante", type: "Normal" },
  ];
  
  // Função para salvar tarefas no localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Função para renderizar elementos na lista de tarefas
  function renderElements() {
    const taskList = document.querySelector(".tasks__list"); // Seleciona a lista de tarefas
    taskList.innerHTML = ""; // Limpa a lista de tarefas existente
  
    tasks.forEach((task) => {
      const taskItem = createTaskItem(task.title, task.type); // Cria um novo item de tarefa
      taskList.appendChild(taskItem); // Adiciona o item de tarefa à lista
    });
  }
  
  // Função para criar um item de tarefa
  function createTaskItem(title, type) {
  
    const liTaskItem = document.createElement("li"); // Cria o elemento <li> para a tarefa
    const divListaEdition = document.createElement("div"); // Cria um <div> para edição da lista
    const divCircleEdition = document.createElement("div"); // Cria um <div> para o círculo de prioridade
    const divTaskInfo = document.createElement("div"); // Cria um <div> para informações da tarefa
    const spanTaskType = document.createElement("span"); // Cria um <span> para o tipo de tarefa
    const pTaskTitle = document.createElement("p"); // Cria um <p> para o título da tarefa
    const buttonRemoveTask = document.createElement("button"); // Cria um botão para remover a tarefa
    const imgRemoveTask = document.createElement("img"); // Cria uma imagem para o ícone de remoção
    
  
    liTaskItem.classList.add("task__item"); // Adiciona classe ao item da tarefa
    divListaEdition.classList.add("lista-edition"); // Adiciona classe à edição da lista
  
    // Adiciona a classe correta ao círculo de prioridade com base no tipo de tarefa
    if (type === "urgente") {
      divCircleEdition.classList.add("circle-urgent");
    } else if (type === "importante") {
      divCircleEdition.classList.add("circle-important");
    } else if (type === "normal") {
      divCircleEdition.classList.add("circle-normal");
    }
  
    spanTaskType.classList.add("task-type"); // Adiciona classe ao tipo de tarefa
    pTaskTitle.textContent = title; // Define o texto do título da tarefa
  
    imgRemoveTask.src = "./assets/trash-icon.svg"; // Define o ícone de remoção
    imgRemoveTask.alt = "trash-icon"; // Define o texto alternativo para a imagem
    imgRemoveTask.style.width = "10px"; // Define a largura da imagem
  
    buttonRemoveTask.classList.add("task__button--remove-task"); // Adiciona classe ao botão de remoção
    buttonRemoveTask.appendChild(imgRemoveTask); // Adiciona a imagem ao botão de remoção
    buttonRemoveTask.addEventListener("click", () => removeTask(title)); // Adiciona o evento de clique para remover a tarefa
  
    // Monta o item da tarefa
    divListaEdition.append(
      divCircleEdition,
  
      divTaskInfo,
  
      spanTaskType,
  
      pTaskTitle
    );
    liTaskItem.append(divListaEdition, buttonRemoveTask);
  
    return liTaskItem; // Retorna o item de tarefa criado
  }
  
  // Adicionar nova tarefa ao clicar no botão "Adicionar Tarefa"
  
  document
  
    .querySelector(".form__button--add-task")
  
    .addEventListener("click", (event) => {
      event.preventDefault(); // Impede o comportamento padrão do botão
      const titleInput = document.getElementById("input_title"); // Seleciona o campo de título
      const typeInput = document.querySelector(".form__input--priority"); // Seleciona o campo de prioridade
  
      // Verifica se ambos os campos têm valores
      if (titleInput.value && typeInput.value) {
        const newTask = { title: titleInput.value, type: typeInput.value }; // Cria um novo objeto de tarefa
        tasks.push(newTask); // Adiciona a nova tarefa ao array de tarefas
        saveTasks(); // Salva as tarefas no localStorage
        renderElements(); // Renderiza novamente os elementos
        
        // Limpa os campos de entrada
        titleInput.value = "";
        typeInput.value = "";
      }
    });
  
  // Função para remover uma tarefa pelo título
  
  function removeTask(title) {
    tasks = tasks.filter((task) => task.title !== title); // Filtra o array de tarefas removendo a tarefa com o título correspondente
    saveTasks(); // Salva as tarefas atualizadas no localStorage
    renderElements(); // Renderiza novamente os elementos
  }
  // Renderizar as tarefas ao carregar a página
  document.addEventListener("DOMContentLoaded", renderElements);
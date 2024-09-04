import { ref } from "vue";

export interface ErrorItem {
  id: string;
  message: string;
  timestamp: Date;
  name: string
  stack?: string;
}

const errors = ref<ErrorItem[]>([]);

export function addError({ message, name, stack }: { message: string; name: string, stack?: string }) {
  errors.value.unshift({
    id: Date.now().toString(),
    message,
    name,
    timestamp: new Date(),
    stack
  });
  // Optionally, save to localStorage
  // saveErrorsToLocalStorage();
}

export function removeError(id: string) {
  const index = errors.value.findIndex((error) => error.id === id);
  if (index !== -1) {
    errors.value.splice(index, 1);
    // Optionally, update localStorage
    // saveErrorsToLocalStorage();
  }
}

export function getErrors() {
  return errors;
}

function saveErrorsToLocalStorage() {
  localStorage.setItem("appErrors", JSON.stringify(errors.value));
}

export function loadErrorsFromLocalStorage() {
  const storedErrors = localStorage.getItem("appErrors");
  if (storedErrors) {
    errors.value = JSON.parse(storedErrors);
  }
}

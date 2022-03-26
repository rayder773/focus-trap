export class FocusTrap {
  #tabElements = [];

  constructor(container) {
    this.container = container;
  }

  renewtabElements = () => {
    this.#tabElements = Array.from(
      this.container.querySelectorAll('button, input, a, [tabindex="0"]')
    ).filter((el) => el.offsetParent);
  };

  start = (index = 0) => {
    this.renewtabElements();
    document.addEventListener("keydown", this.onTabPress);
    this.#tabElements[index].focus();
  };

  stop = () => {
    document.removeEventListener("keydown", this.onTabPress);
  };

  onTabPress = (event) => {
    if (event.key !== "Tab") return;
    event.preventDefault();

    let nexActiveElementIndex = null;

    if (document.activeElement === document.body) {
      nexActiveElementIndex = 0;
    } else {
      nexActiveElementIndex = this.#tabElements.findIndex(
        (el) => el === document.activeElement
      );
    }

    let direction;
    let restartPosition;

    if (event.shiftKey) {
      direction = -1;
      restartPosition = this.#tabElements.length - 1;
    } else {
      direction = 1;
      restartPosition = 0;
    }

    const nextIndex = nexActiveElementIndex + direction;

    if (this.#tabElements[nextIndex]) {
      nexActiveElementIndex = nextIndex;
    } else {
      nexActiveElementIndex = restartPosition;
    }

    if (this.#tabElements[nexActiveElementIndex].disabled) {
      nexActiveElementIndex += direction;

      if (!this.#tabElements[nexActiveElementIndex]) {
        nexActiveElementIndex = restartPosition;
      }
    }

    this.#tabElements[nexActiveElementIndex].focus();
  };
}

/* eslint-disable no-param-reassign */
export default function (element, binding) {
  element.style.position = 'absolute';
  Object.keys(binding.value).forEach((key) => {
    element.style[key] = binding.value[key];
  });
}

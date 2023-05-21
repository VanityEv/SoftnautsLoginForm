## Issues/thoughts
I found confusing one thing in Figma design : asterisks instead of bullets in password field.
I wonder if that was mandatory to implement or it was browser specific display while creating design, but I skipped that part.
As I know it is possible to use `-webkit-text-security: square;` to acheive that effect, but that doesn't apply to password field.
There is a way like using code below:
````
<div>
  <input type="password" />
  <span id="asterisks"></span>
</div>
const passwordField = document.querySelector('input');
const asteriskedText = document.querySelector('#asterisks');

passwordField.addEventListener('keyup', () => {
  const asterisks = Array(inputEl.value.length).fill('*').join('');
  asteriskedText.innerHTML = asterisks;
})
````
But I believe that weakening security model was not intended here :)

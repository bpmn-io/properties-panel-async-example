import options from './options.json';

const TIMEOUT = 500;

export async function fetchOptions() {
  return await asyncWrapper(options);
}


// helpers ////////

function asyncWrapper(response) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(response), TIMEOUT);
  });
}
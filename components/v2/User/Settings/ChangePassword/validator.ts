import { Rule } from 'async-validator';

// export
let descriptor: Record<string, Rule> = {
  newPassword: {
    type: 'string',
    required: true,
    pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
    message: 'Incorrect Password'
  },
  reenterPassword: {
    type: 'string',
    required: true,
    pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
    message: 'Incorrect Password'
  }
};

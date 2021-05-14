interface IMessageConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.EMAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'gustavo@guribeiro.com',
      name: 'Gustavo Henrique Ribeiro Dias',
    },
  },
} as IMessageConfig;

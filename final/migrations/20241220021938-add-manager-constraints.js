import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface) {
  // Adăugăm coloana ManagerId în tabelul Hotel
  await queryInterface.addColumn('Hotel', 'ManagerId', {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',  // Se face referire la tabela Users
      key: 'id',
    },
    allowNull: false,  // Se presupune că fiecare hotel are un manager
  });
}

export async function down(queryInterface) {
  // Dacă vrem să revenim asupra schimbărilor, eliminăm coloana ManagerId
  await queryInterface.removeColumn('Hotel', 'ManagerId');
}

import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface) {
  // Adăugăm coloana ManagerId în tabelul Users
  await queryInterface.addColumn('Users', 'ManagerId', {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Se face referire la aceeași tabelă Users
      key: 'id',
    },
    allowNull: true,  // Se presupune că un utilizator poate să nu aibă un manager
  });
}

export async function down(queryInterface) {
  // Dacă vrem să revenim asupra schimbărilor, eliminăm coloana ManagerId
  await queryInterface.removeColumn('Users', 'ManagerId');
}


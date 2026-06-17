-- Update initial spaces with descriptions in Portuguese based on name and capacity
UPDATE espaco SET descricao = 'Sala de jogos com mesa de sinuca, pingue-pongue e pebolim para até 10 pessoas.' WHERE nome = 'Sala de Jogos';
UPDATE espaco SET descricao = 'Salão de festas amplo, ideal para eventos de médio a grande porte para até 50 pessoas.' WHERE nome = 'Salão de Festas A';
UPDATE espaco SET descricao = 'Salão de festas de porte médio, adequado para comemorações íntimas para até 30 pessoas.' WHERE nome = 'Salão de Festas B';
UPDATE espaco SET descricao = 'Área com churrasqueira gourmet, mesas e cadeiras com capacidade para 15 pessoas.' WHERE nome = 'Churrasqueira A';
UPDATE espaco SET descricao = 'Área com churrasqueira gourmet, pia de apoio e capacidade para 15 pessoas.' WHERE nome = 'Churrasqueira B';
UPDATE espaco SET descricao = 'Quadra poliesportiva externa e demarcada para jogos em equipe para até 20 pessoas.' WHERE nome = 'Quadra Poliesportiva';

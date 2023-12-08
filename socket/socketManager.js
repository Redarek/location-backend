const socketIo = require('socket.io');
const FloorService = require('../application/service/FloorService')
const WallService = require('../application/service/WallService')

module.exports = (server) => {
    const io = socketIo(server);

    io.of('/floor').on('connection', (socket) => {
        console.log('Клиент подключился к пространству /floor');
        // Подписка на событие, которое получает 'floor id'
        socket.on('joinFloor', (floorId) => {
            const room = `floor-${floorId}`;
            socket.join(room);
            console.log(`Клиент присоединился к комнате floor-${floorId}`);

            // Тип 1: запросы, требующие изменения в БД и отправки всем в комнате
            // патч этажа
            socket.on('patchFloor', async (data) => {
                await FloorService.patch(floorId, ...data); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('patchFloor', data); // Отправка всем в комнате
            });
            // удаление картинки этажа
            socket.on('deleteFloorImage', async () => {
                await FloorService.deleteImage(floorId); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('deleteFloorImage'); // Отправка всем в комнате
            });
            // создание стены
            socket.on('createWall', async (data) => {
                await WallService.create(...data); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('createWall', data); // Отправка всем в комнате
            });
            // обновление координат стены
            socket.on('updateWallCoords', async (data) => {
                await WallService.updateCoords(...data); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('updateWallCoords', data); // Отправка всем в комнате
            });
            // удаление стены
            socket.on('deleteWall', async (data) => {
                await WallService.delete(...data); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('deleteWall', data); // Отправка всем в комнате
            });

            // Тип 2: запросы, не требующие изменения в БД, просто пересылка между клиентами
            socket.on('forward', (data) => {
                socket.to(room).emit('forward', data); // Пересылка всем, кроме отправителя
            });
        });

        socket.on('disconnect', () => {
            console.log('Клиент отключился');
        });
    });
};

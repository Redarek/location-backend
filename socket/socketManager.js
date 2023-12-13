const socketIo = require('socket.io');
const FloorService = require('../application/service/FloorService')
const WallService = require('../application/service/WallService')
const CLIENT_URL = require('../index')

module.exports = (server) => {
    const io = socketIo(server, {
        cors: {credentials: true, origin: CLIENT_URL}
    });
    // Шаг 1: Подключиться к ws://localhost:3500/floor
    // присоединение к пространству floor
    io.of('/floor').on('connection', (socket) => {
        let room
        console.log('Клиент подключился к пространству /floor');
        // Шаг 2: Отправить на ws://localhost:3500/floor - событие=joinFloor, arg1=floorId
        // присоединение к комнате в пространстве floor
        socket.on('joinFloor', (floorId) => {
            room = `floor-${floorId}`;
            socket.join(room);
            console.log(`Клиент присоединился к комнате \"floor-${floorId}\"`);

            // Шаг 3: отправить какой-то запрос с изменением в БД или просто пересылка
            // Тип 1: запросы, требующие изменения в БД и отправки всем в комнате
            // патч этажа
            socket.on('patchFloor', async (data) => {
                console.log(`patchFloor in ${room}\nData:: ${data}`)
                const {name, number, scale} = data
                await FloorService.patch(floorId, name, number, scale); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('patchFloor', data); // Отправка всем в комнате
            });
            // удаление картинки этажа
            socket.on('deleteFloorImage', async () => {
                console.log(`deleteFloorImage in ${room}`)
                await FloorService.deleteImage(floorId); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('deleteFloorImage'); // Отправка всем в комнате
            });
            // создание стены
            socket.on('createWall', async (data) => {
                console.log(`createWall in ${room}\nData:: ${data}`)
                const {x1, y1, x2, y2, wallTypeId} = data
                const wall = await WallService.create(x1, y1, x2, y2, wallTypeId, floorId); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('createWall', { ...data, ...wall }); // Отправка всем в комнате
            });
            // обновление координат стены
            socket.on('updateWallCoords', async (data) => {
                console.log(`updateWallCoords in ${room}\nData:: ${data}`)
                const {x1, y1, x2, y2, wallId} = data
                await WallService.updateCoords(x1, y1, x2, y2, wallId); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('updateWallCoords', data); // Отправка всем в комнате
            });
            // удаление стены
            socket.on('deleteWall', async (data) => {
                console.log(`deleteWall in ${room}\nData:: ${data}`)
                const {wallId} = data
                await WallService.delete(wallId); // Обработка и обновление в БД
                io.of('/floor').to(room).emit('deleteWall', data); // Отправка всем в комнате
            });

            // Тип 2: запросы, не требующие изменения в БД
            // Пересылка всем в комнате
            socket.on('forward', (data) => {
                console.log(`forward in ${room}\nData:: ${data}`)
                socket.to(room).emit('forward', data); // Пересылка всем, кроме отправителя
            });
        });

        socket.on('disconnect', () => {
            console.log(`disconnect in ${room}\nSocket ID:: ${socket.id}`)
            socket.to(room).emit('leaveRoom', socket.id); // Пересылка уведомления о дисконнекте всем, кроме отправителя
        });
    });
};

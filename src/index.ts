import TelegramBot from "node-telegram-bot-api";
import adminChatId from "./config/admin.config.ts";

const token = "7140406712:AAHvOCoJzeTngUrmeFcJEoW62CZiQ6Nt-mk";
const bot = new TelegramBot(token, { polling: true });

console.log("BOT STARTED");

bot.onText(/\/help/, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
        "[BOT] Bot hỗ trợ tự động, bạn cần thông tin gì?",
        {
            reply_to_message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Hướng dẫn mod skin với Android 12-",
                            url: "https://youtu.be/VL5Q7RSNi30?si=WsAhglGX4-r0lydR",
                        },
                    ],
                    [
                        {
                            text: "Fix treo 79%, Fix thất bại, không hiệu ứng",
                            switch_inline_query_current_chat: "/fix79",
                        },
                    ],
                    [
                        {
                            text: "Mod trên Android 14 bằng Shizuku",
                            switch_inline_query_current_chat: "/shizuku",
                        },
                    ],
                    [
                        {
                            text: "Không cấp quyền được?",
                            switch_inline_query_current_chat: "/loicapquyen",
                        },
                    ],
                ],
            },
        },
    );
});

bot.onText(/\/ban/, async (msg, match) => {
    if (!adminChatId.master.includes(msg.chat.id)) {
        await bot.sendMessage(msg.chat.id, "Phải admin đâu mà ấn?", {
            reply_to_message_id: msg.message_id,
        });
    } else {
        const replyId = msg.reply_to_message?.chat.id;
        await bot.banChatMember(msg.chat.id, replyId!, {
            revoke_messages: true,
        });
        await bot.sendMessage(msg.chat.id, "Đã ban :D", {
            reply_to_message_id: msg.message_id,
        });
    }
});

bot.onText(/\/unpinall/, async (msg, match) => {
    if (await isAdmin(msg)) {
        await bot.unpinAllChatMessages(msg.chat.id);
        await bot.sendMessage(msg.chat.id, "Đã unpin :D", {
            reply_to_message_id: msg.message_id,
        });
    }
});

async function isAdmin(msg: TelegramBot.Message) {
    if (!adminChatId.master.includes(msg.chat.id)) {
        await bot.sendMessage(msg.chat.id, "Phải admin đâu mà ấn?", {
            reply_to_message_id: msg.message_id,
        });
        return false;
    }
    return true;
}

bot.onText(/\/fix79/, async (msg, match) => {
    await bot.sendMessage(
        msg.chat.id,
        "Bước 1: Vào game chọn Khôi phục nhanh ở cài đặt\nBước 2: Tải lại tài nguyên sau đó thoát hẳn game và vô app Nox Mod Skin\nBước 3: Tại trang chủ, chọn Sửa lỗi mod > Chọn Fix hiệu ứng. Chờ khoảng 3p nó sẽ nhảy qua màn hình mod, nhưng hãy ấn nút Ngôi nhà để về trang chủ, và thao tác lại như ban nãy đối với Fix ngoại hình, Fix âm thanh\nSau khi fix tất cả xong, bạn có thể mod bình thường nhé :D",
        {
            reply_to_message_id: msg.message_id,
        },
    );
});

bot.onText(/\/loicapquyen/, async (msg, match) => {
    await bot.sendMessage(
        msg.chat.id,
        "Nếu bạn sử dụng Android 11 trở lên, bạn sẽ có thể không còn cấp được quyền một cách thoải mái để mod nữa, tức là không ấn được nút Sử dụng thư mục này. Hãy thử những cách sau:\n*1. Xoá cài đặt cập nhật ứng dụng Files*: Vào app Nox Mod chọn Fix cấp quyền > Chọn Gỡ cập nhật > Sau đó ấn cấp quyền như bình thường. \n2. *Sử dụng Shizuku để mod*: Xem hướng dẫn cụ thể bằng lệnh /shikuzu, làm theo là được :D",
        {
            reply_to_message_id: msg.message_id,
            parse_mode: "Markdown",
        },
    );
});

bot.onText(/\/shizuku/, async (msg, match) => {
    await bot.sendMessage(
        msg.chat.id,
        "Bước 1: Tải Shizuku ở Play Store và thực hiện bật dịch vụ Shizuku\nBước 2: Xem hướng dẫn tại video dưới\nLưu ý mỗi lần sử dụng mod, bạn cần phải chạy dịch vụ Shikuzu để tránh lỗi",
        {
            reply_to_message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Xem hướng dẫn",
                            url: "https://youtu.be/vfCxurhs090?si=cY5iSAeLDX0kV6AS",
                        },
                    ],
                ],
            },
        },
    );
});

bot.onText(/\/link/, async (msg) => {
    await bot.sendMessage(msg.chat.id, "Link tải app :", {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Tải Nox Mod Skin thường",
                        url: "https://play.google.com/store/apps/details?id=com.nox.aov.std",
                    },
                ],
                [
                    {
                        text: "Tải Nox Mod Skin PRO",
                        url: "https://play.google.com/store/apps/details?id=com.noxinfinity.modskin",
                    },
                ],
            ],
        },
    });
});

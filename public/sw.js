self.addEventListener("push", (event) => {
	const options = {
		body: event.data.text(),
	}

	event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
		const isControlled = clients.some((client) => client.visibilityState === "visible")
		console.log(isControlled)
		if (!isControlled) {
			return self.registration.showNotification("LIME", options)
		}
	}))
})

self.addEventListener("notificationclick", (event) => {
	event.notification.close();

  // 通知のカスタムデータを取得
  const data = event.notification.data;

	event.waitUntil(
		clients.matchAll({
			type: "window",
			includeUncontrolled: true,
    })
    .then(function(clientList) {
      // すでに開いているウィンドウがあれば、そこにフォーカス
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      // 新しいウィンドウを開く
			return clients.openWindow("/")
		})
	)
})

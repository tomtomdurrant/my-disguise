CREATE TABLE `oscCommands` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`description` text,
	`targetIp` text,
	`targetPort` integer,
	`targetMachineName` text,
	`address` text,
	`args` text,
	`created` text DEFAULT (current_timestamp) NOT NULL
);

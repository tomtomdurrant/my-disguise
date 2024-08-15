ALTER TABLE `oscCommands` ADD `created` text DEFAULT (current_timestamp) NOT NULL;--> statement-breakpoint
ALTER TABLE `oscCommands` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `oscCommands` DROP COLUMN `updatedAt`;
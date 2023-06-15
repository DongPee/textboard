CREATE TABLE `게시글` (
	`작성자` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`제목` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`내용` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`작성일자` VARCHAR(50) NOT NULL DEFAULT curdate() COLLATE 'utf8mb4_general_ci',
	`고유번호` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`고유번호`) USING BTREE
)
COMMENT='작성자, 제목, 내용, 작성일자, 고유 번호'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=3
;


CREATE TABLE `댓글` (
	`작성자` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`시간` DATE NOT NULL DEFAULT curdate(),
	`고유번호` INT(11) NOT NULL AUTO_INCREMENT,
	`내용` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`게시글 고유번호` INT(11) UNSIGNED NOT NULL,
	PRIMARY KEY (`고유번호`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;

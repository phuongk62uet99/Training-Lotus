<?php 
	session_start();  
	include '../../connect.php'; 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Add question</title>
	<link rel="stylesheet" href="<?= $url ?>public/css/question.css">
	<link rel="stylesheet" href="<?= $url ?>public/css/edit-question.css">
	<link rel="stylesheet" href="<?= $url ?>public/fontawesome/css/all.css">
</head>
<body>
	<div class="container-qs">
		<div class="toolbar-left">
			<ul class="list-action">
				<li class="action">
					<a href="" title="">
						<i class="fas fa-chart-line"></i>
					</a>
				</li>
				<li class="action" title="telegram">
					<a href="">
						<i class="fab fa-telegram-plane"></i>
					</a>
				</li>
			</ul>
		</div>
		<div class="main">
			<div class="header">
				<div class="h-left">
					<div class="header-act H">
						<a href="" title="edit">
							<i class="fa fa-edit"></i>
						</a>
					</div>
					<div class="header-act">
						<a href="" title="quản lý instance article">
							<i class="fa fa-sticky-note"></i>
							<span>cài bài</span>
						</a>
					</div>
					<div class="header-act">
						<a href="" title="thảo luận">
							<i class="fas fa-chart-bar"></i>
							<span>thống kê</span>
						</a>
					</div>
				</div>
				<div class="h-right">
					<div class="info">
						<div class="name">
							ADMIN
						</div>
						<div class="avatar">
							<img src="<?= $url ?>public/images/nguyenthanh.jpg" alt="" />
						</div>
					</div>
					<div class="logOut">
						<a href="<?= $url ?>controllers/LogOut.php">Đăng xuất</a>
					</div>
				</div>
			</div>
			<div class="main-body">
				<div class="m-left">
					<div class="m-left-main">
						<div class="title">
							<p>Question</p>
						</div>
						<div class="list-manager">
							<div class="man">
								<div class="title">Thông tin</div>
								<?php 
									include "../../controllers/EditQS.php";
									if(empty($resultChilQS)){
								?>
									<div class="groud-man">
										<a title="">
											<span>Không có!!</span>
										</a>
									</div>
								<?php
									} else {
										foreach ($resultChilQS as $valueChilQS) {
								?>
									<div class="groud-man">
										<a href="<?= $url ?>views/question.php" title="">
											<i class="fa fa-question"></i>
											<span><?= $valueChilQS['name'] ?></span>
										</a>
									</div>
								<?php
										}
									}
								?>
								
							</div> 
						</div>
					</div>
				</div>
				<div class="m-right">
					<div class="m-right-header">
						<div class="m-right-header-L">
							<div class="gr-action">
								<a href="<?= $url ?>views/action/add_question.php" title="thêm câu hỏi">
									<i class="fas fa-pencil-ruler"></i>
									<span>thêm câu hỏi</span>
								</a>
							</div>
						</div>
					</div>
					<div class="m-right-main">
						<div class="m-right-main-list-br">
							<div class="form-add-qs">
								<div class="add-qs-l">
									<div class="form-editor">
										a
									</div>
								</div>
								<div class="add-qs-r">
									b
								</div>
							</div>
						</div>
						<div class="m-right-main-bar">
							<div class="report">
								<i class="fa fa-info-circle"></i>
							</div>
							<div class="report">
								<i class="fa fa-cog"></i>
							</div>
							<div class="report">
								<i class="fa fa-bar-chart"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
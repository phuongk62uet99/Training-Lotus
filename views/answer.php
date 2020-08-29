<?php
	include "../connect.php";
	session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Answer</title>
	<link rel="stylesheet" href="<?= $url ?>public/css/question.css">
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
							<p>bài của tôi</p>
						</div>
						<div class="list-manager">
							<div class="man">
								<div class="title">tin bài</div>
								<div class="groud-man">
									<a href="<?= $url ?>views/question.php" title="Quản lý câu hỏi">
										<i class="fa fa-question"></i>
										<span>Quản lý câu hỏi</span>
									</a>
								</div>
								<div class="groud-man">
									<a href="" title="Quản lý câu trả lời">
										<i class="fa fa-comment"></i>
										<span>Quản lý câu trả lời</span>
									</a>
									<div class="noti">
										8
									</div>
								</div>
							</div> 
						</div>
					</div>
				</div>
				<div class="m-right">
					<div class="m-right-header">
						<div class="m-right-header-L">
							<div class="gr-action">
								<a href="AddListAccount.html" title="thêm câu hỏi">
									<i class="fas fa-pencil-ruler"></i>
									<span>thêm câu hỏi</span>
								</a>
							</div>
						</div>
					</div>
					<div class="m-right-main">
						<div class="m-right-main-list-br">
							<div class="m-right-main-list">
								<div class="option">
									<div class="option-L">
										<div class="option-action">
											<div class="option-action-select">
												<select name="" id="" class="groud">
													<option value="">Xóa</option>
												</select>
											</div>
											<div class="option-action-apply">
												<button type="submit" class="apply">
													<div class="txt-ap">THỰC HIỆN</div>
												</button>
											</div>
										</div>
										<div class="wall">
											<div class="fz">|</div>
											<div class="fz">|</div>
											<div class="fz">|</div>
										</div>
										<div class="option-action">
											<div class="m-right-header-R" title="tìm kiếm" onclick="toggle()">
												<i class="fa fa-search" id="blockSearch"></i>
												<input type="text" id="txtSearch" class="txt search" placeholder="từ khóa" onclick="toggle()" />
											</div>
											<div class="option-action-apply calendar">
												<i class="far fa-calendar-alt"></i>
												<span>Từ ngày</span>
											</div>
											<div class="option-action-apply calendar">
												<i class="far fa-calendar-alt"></i>
												<span>Tới ngày</span>
											</div>
											<div class="option-action-apply">
												<button type="submit" class="apply">
													<div class="txt-ap">LỌC</div>
												</button>
											</div>
										</div>
									</div>
									<div class="option-R">
										<div class="totalPage">1 đến 50 trong tổng số 5125 tài khoản</div>
										<div class="pagenation">
											<ul class="page">
												<li class="pre">
													<a href="">
														<i class="fa fa-chevron-left"></i> 
													</a> 
												</li>
												<li class="current">
													<a href=""> 1 </a>
												</li> 
												<li class="next">
													<a href="">
														<i class="fa fa-chevron-right"></i>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="lists">
									<div class="posts">
										<div class="post header">
											<div class="item checkbox">
												<input type="checkbox" />
											</div>
											<div class="item catalog">
												Question_id
											</div>
											<div class="item detail-ans">
												Tên câu hỏi
											</div>
											<div class="item content center">
												Nội dung trả lời
											</div>
											<div class="item status">
												Thực hiện
											</div>
										</div>
										<?php 
											include "../controllers/Answer.php";
											foreach ($resultANS as $valueANS) {
										?>
										<div class="post">
											<div class="item checkbox">
												<input type="checkbox" />
											</div>
											<div class="item catalog">
												<?= $valueANS['question_id'] ?>
											</div>
											<div class="item detail-ans">
												<?= $valueANS['name'] ?>
											</div>
											<div class="item content">
												<?= $valueANS['content'] ?>
											</div>
											<div class="item status">
												<a href="">
													<i class="fas fa-pencil-alt"></i>
												</a>
											</div>
										</div>
										<?php } ?>
									</div>
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
<script src="<?= $url ?>public/js/question.js"></script>
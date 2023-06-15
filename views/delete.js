function deletePost(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const 글번호 = urlParams.get('글번호');
    const pw = prompt('비밀번호 입력');
    fetch("/delete-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          글번호: 글번호,
          비밀번호: pw,
        }),
      }).then(response => {
        if (response.ok) {
          // 응답이 성공적으로 받아졌을 때 처리
          return location.href='/';
        } else {
          // 응답이 실패했을 때 처리
          alert('삭제 실패');
        }
      })
      ;
}

function deleteComment(고유번호){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const 게시글고유번호 = urlParams.get('글번호');
    const pw = prompt('비밀번호 입력');
    fetch("/delete-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          게시글고유번호: 게시글고유번호,
          고유번호: 고유번호,
          비밀번호: pw,
        }),
      }).then(response => {
        if (response.ok) {
          // 응답이 성공적으로 받아졌을 때 처리
          return location.reload();
        } else {
          // 응답이 실패했을 때 처리
          alert('삭제 실패');
        }
      })
      ;
}
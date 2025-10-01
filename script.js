// 网络错误处理和资源加载失败的备用机制
window.addEventListener('error', function(e) {
    console.log('检测到错误，但继续运行:', e.message);
    // 不阻止页面继续运行
});

window.addEventListener('unhandledrejection', function(e) {
    console.log('检测到未处理的Promise拒绝，但继续运行:', e.reason);
    // 不阻止页面继续运行
});

// 预加载所有二维码图片，避免闪烁
function preloadQRImages() {
    const qrImages = [
        'WechatIMG363.jpg',
        '3591759208694_.pic.jpg', 
        '3601759208695_.pic.jpg',
        '3581759208690_.pic.jpg',
        '3611759208695_.pic.jpg'
    ];
    
    qrImages.forEach(src => {
        const img = new Image();
        img.src = src;
        console.log('预加载二维码图片：', src);
    });
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成，开始初始化');
    
    // 预加载所有二维码图片
    preloadQRImages();
    
    // 确保删除任何可能存在的测试按钮
    const existingTestBtn = document.querySelector('button[style*="position: fixed"][style*="top: 10px"][style*="left: 10px"]');
    if (existingTestBtn) {
        existingTestBtn.remove();
        console.log('已删除现有的测试按钮');
    }
    
    // 强制删除任何可能存在的移动端弹窗
    const mobileBanners = document.querySelectorAll('[class*="mobile"], [id*="mobile"], [class*="banner"]');
    mobileBanners.forEach(banner => {
        if (banner.textContent.includes('手机用户') || banner.textContent.includes('7.88') || banner.textContent.includes('额外减')) {
            banner.remove();
            console.log('已删除移动端弹窗:', banner);
        }
    });
    
    // 删除任何包含移动端优惠文本的元素
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        if (element.textContent && (
            element.textContent.includes('手机用户专享') ||
            element.textContent.includes('额外减¥1') ||
            element.textContent.includes('仅需¥7.88')
        )) {
            element.remove();
            console.log('已删除包含移动端优惠文本的元素:', element);
        }
    });
    
    // 图表功能已移除，改为用户反馈滚轮
    
    // 初始化支付功能
    initPaymentFeatures();
    
    // 添加动画效果
    addAnimations();
    
    // 初始化营销功能
    initMarketingFeatures();
    
    // 直接启动倒计时
    startCountdown();
    
    // 初始化用户反馈滚轮
    initFeedbackCarousel();
    
    // 立即初始化历史评价和今日评价
    console.log('立即初始化历史评价...');
    initHistoricalFeedback();
    
    console.log('立即初始化今日评价...');
    initTodayFeedback();
    
    // 快速检查，确保一定会执行
    setTimeout(() => {
        console.log('快速检查历史评价...');
        const historicalTrack = document.getElementById('historicalTrack');
        if (historicalTrack && historicalTrack.children.length < 10) {
            console.log('检测到历史评价数量不足，强制重新生成');
            initHistoricalFeedback();
        }
        
        console.log('快速检查今日评价...');
        const todayTrack = document.getElementById('todayTrack');
        if (todayTrack && todayTrack.children.length < 10) {
            console.log('检测到今日评价数量不足，强制重新生成');
            initTodayFeedback();
        }
    }, 500);
    
    
    // 确保欢迎按钮点击事件正常工作（多重保障）
    console.log('初始化欢迎按钮点击事件...');
    
    // 方法1：直接绑定事件监听器
    const welcomeBtn = document.querySelector('.welcome-btn');
    if (welcomeBtn) {
        console.log('找到欢迎按钮，绑定事件监听器');
        welcomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('欢迎按钮被点击（事件监听器）');
            closeWelcome();
        });
        
        // 添加触摸事件支持（移动端）
        welcomeBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('欢迎按钮被触摸（触摸事件）');
            closeWelcome();
        });
    } else {
        console.log('未找到欢迎按钮，尝试延迟查找');
        // 延迟查找，防止DOM未完全加载
        setTimeout(() => {
            const delayedBtn = document.querySelector('.welcome-btn');
            if (delayedBtn) {
                console.log('延迟找到欢迎按钮');
                delayedBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('欢迎按钮被点击（延迟绑定）');
                    closeWelcome();
                });
            }
        }, 1000);
    }
    
    // 方法2：全局函数确保可用
    window.closeWelcome = closeWelcome;
    
    // 方法3：备用点击处理机制（网络不好时的保障）
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('welcome-btn')) {
            console.log('备用点击处理机制触发');
            e.preventDefault();
            e.stopPropagation();
            closeWelcome();
        }
    });
    
    // 方法4：键盘事件支持（按回车键也能关闭）
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const welcomePopup = document.getElementById('welcomePopup');
            if (welcomePopup && welcomePopup.style.display !== 'none') {
                console.log('键盘事件触发关闭弹窗');
                closeWelcome();
            }
        }
    });
    
    // 方法5：超时保障机制（5秒后强制确保按钮可用）
    setTimeout(() => {
        const welcomeBtn = document.querySelector('.welcome-btn');
        if (welcomeBtn && !welcomeBtn.hasAttribute('data-initialized')) {
            console.log('超时保障机制：重新初始化按钮');
            welcomeBtn.setAttribute('data-initialized', 'true');
            
            // 移除所有现有事件监听器
            const newBtn = welcomeBtn.cloneNode(true);
            welcomeBtn.parentNode.replaceChild(newBtn, welcomeBtn);
            
            // 重新绑定事件
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('超时保障机制：按钮被点击');
                closeWelcome();
            });
        }
    }, 5000);
});

// 初始化吸引力图表
function initAttractionChart() {
    const ctx = document.getElementById('attractionChart');
    if (!ctx) return;
    
    // 创建吸引力趋势图表
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            datasets: [{
                label: '魅力指数',
                data: [8.2, 8.5, 8.8, 9.1, 9.3, 9.6, 9.8],
                borderColor: '#e91e63',
                backgroundColor: 'rgba(233, 30, 99, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#e91e63',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }, {
                label: '关注度',
                data: [6.5, 7.2, 7.8, 8.1, 8.4, 8.7, 9.0],
                borderColor: '#ff69b4',
                backgroundColor: 'rgba(255, 105, 180, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ff69b4',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 5,
                    max: 10,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 初始化支付功能
function initPaymentFeatures() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountDisplay = document.getElementById('amount');
    const statusIndicator = document.querySelector('.status-indicator');
    const customAmountInput = document.getElementById('customAmount');
    const setCustomAmountBtn = document.getElementById('setCustomAmount');
    
    // 金额按钮点击事件（修复闪烁问题）
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            const amount = parseFloat(this.getAttribute('data-amount'));
            
            // 立即更新金额显示
            amountDisplay.textContent = amount.toFixed(2);
            
            // 更新按钮状态
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 先更新主页面二维码，再显示弹窗
            updateMainQRCode(amount);
            
            // 延迟显示弹窗，确保主页面二维码先更新
            setTimeout(() => {
                showQRPopup(amount);
            }, 50);
        });
    });
    
    // 自定义金额设置（修复闪烁问题）
    if (setCustomAmountBtn) {
        setCustomAmountBtn.addEventListener('click', function() {
            const customAmount = parseFloat(customAmountInput.value);
            if (customAmount && customAmount > 0) {
                // 立即更新金额显示
                amountDisplay.textContent = customAmount.toFixed(2);
                
                // 清除所有按钮的激活状态
                amountButtons.forEach(btn => btn.classList.remove('active'));
                
                // 先更新主页面二维码，再显示弹窗
                updateMainQRCode(customAmount);
                
                // 延迟显示弹窗，确保主页面二维码先更新
                setTimeout(() => {
                    showQRPopup(customAmount);
                }, 50);
            }
        });
    }
    
    // 回车键设置自定义金额
    if (customAmountInput) {
        customAmountInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && setCustomAmountBtn) {
                setCustomAmountBtn.click();
            }
        });
    }
    
    // 模拟支付状态更新
    setInterval(() => {
        const currentAmount = amountDisplay.textContent;
        if (currentAmount !== '0.00') {
            // 随机更新状态
            const statuses = ['等待支付', '扫描中...', '支付中...', '支付成功'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            updatePaymentStatus(randomStatus);
        }
    }, 5000);
}

// 更新支付状态
function updatePaymentStatus(status) {
    const statusIndicator = document.querySelector('.status-indicator span');
    const statusIcon = document.querySelector('.status-indicator i');
    
    if (statusIndicator) {
        statusIndicator.textContent = status;
    }
    
    // 根据状态更新图标颜色
    if (statusIcon) {
        if (status.includes('成功')) {
            statusIcon.style.color = '#4caf50';
            statusIcon.className = 'fas fa-check-circle';
        } else if (status.includes('支付中') || status.includes('扫描中')) {
            statusIcon.style.color = '#ff9800';
            statusIcon.className = 'fas fa-spinner fa-spin';
        } else {
            statusIcon.style.color = '#ffa726';
            statusIcon.className = 'fas fa-circle';
        }
    }
}

// 更新主页面二维码（修复闪烁问题）
function updateMainQRCode(amount) {
    const qrImage = document.querySelector('.qr-image');
    
    if (!qrImage) return;
    
    // 根据金额选择对应的二维码
    const qrCodeMap = {
        5.88: 'WechatIMG363.jpg',
        8.88: '3591759208694_.pic.jpg',
        10.88: '3601759208695_.pic.jpg',
        16.88: '3581759208690_.pic.jpg',
        28.88: '3611759208695_.pic.jpg'
    };
    
    const qrSrc = qrCodeMap[amount] || '3591759208694_.pic.jpg';
    
    // 预加载图片，确保不闪烁
    const img = new Image();
    img.onload = function() {
        // 图片加载完成后才更新src，避免闪烁
        qrImage.src = qrSrc;
        console.log('主页面二维码已更新为：', qrSrc);
        
        // 添加视觉反馈
        qrImage.style.transform = 'scale(1.05)';
        qrImage.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.4)';
        
        setTimeout(() => {
            qrImage.style.transform = 'scale(1)';
            qrImage.style.boxShadow = '0 2px 8px rgba(255, 182, 193, 0.3)';
        }, 300);
    };
    img.src = qrSrc;
}

// 更新二维码显示（保留兼容性）
function updateQRCode(amount) {
    updateMainQRCode(amount);
    showAmountConfirmation(amount);
}

// 生成微信支付二维码
function generateWechatQRCode(amount) {
    console.log(`正在切换到金额为 ¥${amount} 的微信支付二维码...`);
    
    // 根据金额选择对应的新二维码
    const qrCodeMap = {
        5.88: 'WechatIMG363.jpg',
        8.88: '3591759208694_.pic.jpg',
        10.88: '3601759208695_.pic.jpg', 
        16.88: '3581759208690_.pic.jpg',
        28.88: '3611759208695_.pic.jpg'
    };
    
    const qrImage = document.querySelector('.qr-image');
    
    if (qrCodeMap[amount]) {
        // 立即切换二维码，无延迟
        qrImage.src = qrCodeMap[amount];
        // 简化状态提示，减少显示时间
        showQuickStatus(`¥${amount} 二维码已切换`);
    } else {
        // 如果没有对应金额的二维码，显示提示
        showQRSetupInstructions(amount);
    }
}

// 快速状态提示
function showQuickStatus(message) {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'quick-status';
    statusDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e91e63;
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 6px;
            z-index: 2000;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 2px 8px rgba(233, 30, 99, 0.3);
            animation: slideIn 0.2s ease-out;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(statusDiv);
    
    // 1秒后自动移除
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 1000);
}

// 显示二维码设置说明
function showQRSetupInstructions(amount) {
    const instructions = document.createElement('div');
    instructions.className = 'qr-setup-instructions';
    instructions.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #333;
            padding: 2rem;
            border-radius: 10px;
            z-index: 3000;
            font-weight: 500;
            text-align: center;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 2px solid #e91e63;
        ">
            <div style="margin-bottom: 1rem; font-size: 1.2rem; color: #e91e63;">📱 设置说明</div>
            <div style="margin-bottom: 1rem;">
                要为 ¥${amount} 设置专用二维码：
            </div>
            <div style="text-align: left; margin-bottom: 1rem;">
                1. 打开微信，点击"+"号<br>
                2. 选择"收付款"<br>
                3. 选择"二维码收款"<br>
                4. 设置金额为 ¥${amount}<br>
                5. 保存二维码图片<br>
                6. 将图片命名为 wechat-qr-${amount}.png
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #e91e63;
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 5px;
                cursor: pointer;
                font-weight: 600;
            ">我知道了</button>
        </div>
    `;
    
    document.body.appendChild(instructions);
}

// 显示二维码生成状态
function showQRGenerationStatus(message) {
    // 创建状态提示
    const statusDiv = document.createElement('div');
    statusDiv.className = 'qr-generation-status';
    statusDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            z-index: 2000;
            font-weight: 600;
            text-align: center;
            min-width: 200px;
        ">
            <div style="margin-bottom: 0.5rem;">🔄</div>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(statusDiv);
    
    // 2秒后自动移除
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 2000);
}

// 显示金额确认信息
function showAmountConfirmation(amount) {
    // 创建临时提示
    const confirmation = document.createElement('div');
    confirmation.className = 'amount-confirmation';
    confirmation.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e91e63;
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(233, 30, 99, 0.3);
            z-index: 1000;
            font-weight: 600;
            font-size: 0.9rem;
            animation: slideIn 0.2s ease-out;
        ">
            💰 ¥${amount}
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // 1.5秒后自动移除
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.parentNode.removeChild(confirmation);
        }
    }, 1500);
}

// 添加动画效果
function addAnimations() {
    // 统计数字动画
    animateNumbers();
    
    // 卡片悬停效果
    addCardHoverEffects();
    
    // 页面加载动画
    addPageLoadAnimations();
}

// 数字动画效果
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPercentage = finalValue.includes('%');
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                
                animateValue(target, 0, numericValue, 2000, isPercentage);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(number => observer.observe(number));
}

// 数字递增动画
function animateValue(element, start, end, duration, isPercentage = false) {
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = isPercentage ? current + '%' : current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// 卡片悬停效果
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .beauty-card, .qr-container');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 页面加载动画
function addPageLoadAnimations() {
    const elements = document.querySelectorAll('.left-panel, .right-panel');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(' + (index === 0 ? '-50px' : '50px') + ')';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// 添加一些额外的交互功能
function addExtraFeatures() {
    // 二维码点击放大效果
    const qrImage = document.querySelector('.qr-image');
    if (qrImage) {
        qrImage.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // 美女图片画廊功能
    const mainImg = document.querySelector('.main-img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImg && thumbnails.length > 0) {
        const images = ['beauty-1.jpg', 'beauty-2.jpg', 'beauty-3.jpg', 'beauty-4.jpg', 'beauty-5.jpg'];
        let currentIndex = 0;
        
        // 缩略图点击切换
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                // 更新主图片
                currentIndex = index;
                mainImg.src = images[currentIndex];
                
                // 更新缩略图激活状态
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
                
                // 添加切换动画
                mainImg.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    mainImg.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        mainImg.style.transform = 'scale(1)';
                    }, 150);
                }, 150);
            });
        });
        
        // 主图片点击切换到下一张
        mainImg.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            this.src = images[currentIndex];
            
            // 更新缩略图激活状态
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[currentIndex].classList.add('active');
            
            // 添加切换动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 150);
        });
        
        // 自动轮播（每5秒切换一次）
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            mainImg.src = images[currentIndex];
            
            // 更新缩略图激活状态
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[currentIndex].classList.add('active');
        }, 5000);
    }
}

// 添加心跳动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes heartbeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.1); }
        50% { transform: scale(1.05); }
        75% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .amount-btn.active {
        background: #d63384;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(233, 30, 99, 0.4);
    }
`;
document.head.appendChild(style);

// 复制QQ号功能
function copyQQ() {
    const qqNumber = '3472132884';
    
    // 尝试使用现代API复制到剪贴板
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(qqNumber).then(() => {
            showCopySuccess('QQ号已复制到剪贴板！');
        }).catch(() => {
            fallbackCopy(qqNumber);
        });
    } else {
        fallbackCopy(qqNumber);
    }
}

// 备用复制方法
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess('QQ号已复制到剪贴板！');
    } catch (err) {
        showCopyError('复制失败，请手动复制：' + text);
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功提示
function showCopySuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'copy-success';
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            animation: slideIn 0.3s ease-out;
        ">
            ✅ ${message}
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// 显示复制失败提示
function showCopyError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'copy-error';
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
            animation: slideIn 0.3s ease-out;
        ">
            ❌ ${message}
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// 显示订单区域
function showOrderSection(amount, packageText) {
    const orderSection = document.getElementById('orderSection');
    const orderAmount = document.getElementById('orderAmount');
    const orderPackage = document.getElementById('orderPackage');
    
    if (orderSection && orderAmount && orderPackage) {
        orderAmount.textContent = amount + '.00';
        orderPackage.textContent = packageText;
        orderSection.style.display = 'block';
        
        // 添加显示动画
        orderSection.style.opacity = '0';
        orderSection.style.transform = 'translateY(20px)';
        setTimeout(() => {
            orderSection.style.transition = 'all 0.3s ease';
            orderSection.style.opacity = '1';
            orderSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

// 创建订单功能
function createOrder() {
    const orderAmount = document.getElementById('orderAmount').textContent;
    const orderPackage = document.getElementById('orderPackage').textContent;
    
    // 显示订单确认
    showOrderConfirmation(orderAmount, orderPackage);
    
    // 模拟创建订单过程
    showOrderStatus('正在创建订单...');
    
    setTimeout(() => {
        showOrderStatus('订单创建成功！');
        
        // 模拟跳转到微信支付
        setTimeout(() => {
            showWechatPayRedirect();
        }, 1500);
    }, 2000);
}

// 显示订单确认
function showOrderConfirmation(amount, packageText) {
    const confirmation = document.createElement('div');
    confirmation.className = 'order-confirmation';
    confirmation.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #333;
            padding: 2rem;
            border-radius: 12px;
            z-index: 3000;
            font-weight: 500;
            text-align: center;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 2px solid #e91e63;
        ">
            <div style="margin-bottom: 1rem; font-size: 1.2rem; color: #e91e63;">🛒 订单确认</div>
            <div style="margin-bottom: 1rem;">
                <strong>金额：</strong>¥${amount}<br>
                <strong>套餐：</strong>${packageText}
            </div>
            <div style="margin-bottom: 1rem; color: #666; font-size: 0.9rem;">
                点击确认后将跳转到微信支付
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #e91e63;
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                margin-right: 0.5rem;
            ">确认下单</button>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #ccc;
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
            ">取消</button>
        </div>
    `;
    
    document.body.appendChild(confirmation);
}

// 显示订单状态
function showOrderStatus(message) {
    const statusDiv = document.createElement('div');
    statusDiv.className = 'order-status';
    statusDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e91e63;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 2000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
            animation: slideIn 0.3s ease-out;
        ">
            🛒 ${message}
        </div>
    `;
    
    document.body.appendChild(statusDiv);
    
    setTimeout(() => {
        if (statusDiv.parentNode) {
            statusDiv.parentNode.removeChild(statusDiv);
        }
    }, 3000);
}

// 显示微信支付跳转
function showWechatPayRedirect() {
    const redirectDiv = document.createElement('div');
    redirectDiv.className = 'wechat-pay-redirect';
    redirectDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            color: #333;
            padding: 2rem;
            border-radius: 12px;
            z-index: 3000;
            font-weight: 500;
            text-align: center;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            border: 2px solid #07c160;
        ">
            <div style="margin-bottom: 1rem; font-size: 1.2rem; color: #07c160;">💳 微信支付</div>
            <div style="margin-bottom: 1rem;">
                正在跳转到微信支付...
            </div>
            <div style="margin-bottom: 1rem; color: #666; font-size: 0.9rem;">
                请使用微信扫描二维码完成支付
            </div>
            <div style="
                width: 40px;
                height: 40px;
                border: 3px solid #07c160;
                border-top: 3px solid transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            "></div>
        </div>
    `;
    
    document.body.appendChild(redirectDiv);
    
    // 3秒后自动关闭
    setTimeout(() => {
        if (redirectDiv.parentNode) {
            redirectDiv.parentNode.removeChild(redirectDiv);
        }
    }, 3000);
}

// 初始化额外功能
document.addEventListener('DOMContentLoaded', addExtraFeatures);

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // 数字键1-4选择金额
    if (e.key >= '1' && e.key <= '4') {
        const buttons = document.querySelectorAll('.amount-btn');
        const index = parseInt(e.key) - 1;
        if (buttons[index]) {
            buttons[index].click();
        }
    }
    
    // 空格键重置金额
    if (e.key === ' ') {
        document.getElementById('amount').textContent = '0.00';
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
        updatePaymentStatus('等待支付');
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('amount-btn')) {
            e.target.style.transform = 'scale(0.95)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('amount-btn')) {
            e.target.style.transform = '';
        }
    });
}

// 显示二维码弹窗（修复闪烁问题）
function showQRPopup(amount) {
    console.log('显示弹窗，金额：', amount);
    
    const popupOverlay = document.getElementById('popupOverlay');
    const popupQR = document.getElementById('popupQR');
    const popupAmount = document.getElementById('popupAmount');
    
    // 立即设置金额
    popupAmount.textContent = '¥' + amount;
    
    // 根据金额选择对应的二维码
    const qrCodeMap = {
        5.88: 'WechatIMG363.jpg',
        8.88: '3591759208694_.pic.jpg',
        10.88: '3601759208695_.pic.jpg',
        16.88: '3581759208690_.pic.jpg',
        28.88: '3611759208695_.pic.jpg'
    };
    
    const qrSrc = qrCodeMap[amount] || '3591759208694_.pic.jpg';
    
    // 预加载图片，确保不闪烁
    const img = new Image();
    img.onload = function() {
        // 图片加载完成后才更新src，避免闪烁
        popupQR.src = qrSrc;
        console.log('弹窗二维码已更新为：', qrSrc);
    };
    img.src = qrSrc;
    
    // 立即显示弹窗
    popupOverlay.classList.add('show');
    
    // 移除之前的事件监听器，避免重复绑定
    popupOverlay.removeEventListener('click', handlePopupClick);
    popupOverlay.addEventListener('click', handlePopupClick);
}

// 处理弹窗点击事件
function handlePopupClick(e) {
    if (e.target === document.getElementById('popupOverlay')) {
        closePopup();
    }
}

// 关闭弹窗
function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('show');
}

// 打开客服功能（优化版）
function openCustomerService() {
    console.log('打开客服功能');
    
    // 检查是否已有客服弹窗
    const existingService = document.querySelector('.service-overlay');
    if (existingService) {
        existingService.remove();
    }
    
    // 关闭其他营销弹窗
    closeAllMarketingPopups();
    
    // 创建客服弹窗
    const serviceOverlay = document.createElement('div');
    serviceOverlay.className = 'service-overlay';
    serviceOverlay.innerHTML = `
        <div class="service-popup">
            <div class="service-header">
                <h3>💬 客服助手</h3>
                <button class="service-close" onclick="closeService()">×</button>
            </div>
            <div class="service-messages">
                <div class="service-message bot">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        请上传支付凭证，秒发您的套餐
                    </div>
                </div>
            </div>
            <div class="service-input">
                <input type="file" id="paymentProof" accept="image/*" style="display: none;" onchange="handleFileUpload(this)">
                <input type="text" id="messageInput" placeholder="输入消息..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none;" onkeypress="handleKeyPress(event)">
                <button class="upload-btn" onclick="document.getElementById('paymentProof').click()">
                    📎 上传
                </button>
                <button class="send-btn" onclick="sendMessage()">
                    发送
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(serviceOverlay);
    
    // 显示弹窗动画
    setTimeout(() => {
        serviceOverlay.classList.add('show');
        serviceOverlay.style.opacity = '0';
        serviceOverlay.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            serviceOverlay.style.opacity = '1';
            serviceOverlay.style.transform = 'scale(1)';
        }, 50);
    }, 10);
}

// 关闭客服弹窗（优化版）
function closeService() {
    const serviceOverlay = document.querySelector('.service-overlay');
    if (serviceOverlay) {
        serviceOverlay.style.opacity = '0';
        serviceOverlay.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            serviceOverlay.remove();
        }, 200);
    }
}

// 处理文件上传
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addImageMessage(e.target.result, file.name);
        };
        reader.readAsDataURL(file);
    }
}

// 添加图片消息到聊天
function addImageMessage(imageSrc, fileName) {
    const messagesContainer = document.querySelector('.service-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'service-message user';
    userMessage.innerHTML = `
        <div class="message-content image-message">
            <div class="image-preview">
                <img src="${imageSrc}" alt="支付凭证" style="max-width: 200px; max-height: 200px; border-radius: 8px;">
            </div>
            <div class="file-info">📎 ${fileName}</div>
        </div>
        <div class="message-avatar">👤</div>
    `;
    messagesContainer.appendChild(userMessage);
    
    // 自动回复
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'service-message bot';
        botMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                您的支付已收到，请添加QQ客服：<span class="qq-number">3139330983</span>
            </div>
        `;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 处理回车键发送消息
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 发送消息
function sendMessage() {
    const input = document.getElementById('messageInput');
    if (input && input.value.trim()) {
        const messagesContainer = document.querySelector('.service-messages');
        const userMessage = document.createElement('div');
        userMessage.className = 'service-message user';
        userMessage.innerHTML = `
            <div class="message-content">
                ${input.value}
            </div>
            <div class="message-avatar">👤</div>
        `;
        messagesContainer.appendChild(userMessage);
        
        // 自动回复 - 文字消息回复上传凭证提示
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'service-message bot';
            botMessage.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    请您上传支付凭证
                </div>
            `;
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
        
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// ==================== 新增营销功能 ====================

// 1. 离开页面挽留弹窗
function initExitIntent() {
    console.log('初始化离开页面挽留弹窗...');
    let exitIntentShown = false;
    
    // 监听鼠标离开页面
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            setTimeout(() => {
                showExitIntent();
                exitIntentShown = true;
            }, 1000);
        }
    });
    
    // 监听页面关闭前事件
    window.addEventListener('beforeunload', function(e) {
        if (!exitIntentShown) {
            showExitIntent();
            exitIntentShown = true;
        }
    });
}

function showExitIntent() {
    console.log('显示离开页面挽留弹窗');
    const overlay = document.getElementById('exitIntentOverlay');
    if (overlay) {
        // 检查是否有其他弹窗显示
        const welcomePopup = document.getElementById('welcomePopup');
        const timedPopup = document.getElementById('timedPopupOverlay');
        
        if ((welcomePopup && welcomePopup.style.display !== 'none') || 
            (timedPopup && timedPopup.classList.contains('show'))) {
            // 如果有其他弹窗显示，不显示离开页面弹窗
            return;
        }
        
        overlay.classList.add('show');
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.8)';
        
        // 添加显示动画
        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'scale(1)';
        }, 50);
    }
}

function closeExitIntent() {
    console.log('关闭离开页面挽留弹窗');
    const overlay = document.getElementById('exitIntentOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            overlay.classList.remove('show');
        }, 200);
    }
}

// 2. 购买人数实时统计
function initPurchaseCounter() {
    console.log('初始化购买人数统计...');
    
    // 模拟实时购买数据
    setInterval(() => {
        updatePurchaseStats();
    }, 30000); // 每30秒更新一次
    
    // 初始更新
    updatePurchaseStats();
}

function updatePurchaseStats() {
    const todayElement = document.getElementById('todayPurchases');
    const monthElement = document.getElementById('monthPurchases');
    
    if (todayElement) {
        const currentToday = parseInt(todayElement.textContent) || 247;
        const increment = Math.floor(Math.random() * 3) + 1; // 1-3的随机增长
        todayElement.textContent = currentToday + increment;
    }
    
    if (monthElement) {
        const currentMonth = parseInt(monthElement.textContent.replace(',', '')) || 1856;
        const increment = Math.floor(Math.random() * 5) + 1; // 1-5的随机增长
        monthElement.textContent = (currentMonth + increment).toLocaleString();
    }
}

// 3. 限时弹窗优惠
function initTimedPopup() {
    console.log('初始化限时弹窗优惠...');
    
    // 用户停留30秒后显示
    setTimeout(() => {
        showTimedPopup();
    }, 30000);
}

function showTimedPopup() {
    console.log('显示限时弹窗优惠');
    const overlay = document.getElementById('timedPopupOverlay');
    if (overlay) {
        // 检查是否有其他弹窗显示
        const welcomePopup = document.getElementById('welcomePopup');
        if (welcomePopup && welcomePopup.style.display !== 'none') {
            // 如果有欢迎弹窗显示，延迟显示限时弹窗
            setTimeout(() => showTimedPopup(), 2000);
            return;
        }
        
        overlay.classList.add('show');
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.8)';
        
        // 添加显示动画
        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'scale(1)';
            startTimedCountdown();
        }, 50);
    }
}

function closeTimedPopup() {
    console.log('关闭限时弹窗优惠');
    const overlay = document.getElementById('timedPopupOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            overlay.classList.remove('show');
        }, 200);
    }
}

function startTimedCountdown() {
    let timeLeft = 300; // 5分钟
    const countdownElement = document.getElementById('timedCountdown');
    
    const timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (countdownElement) {
            countdownElement.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timer);
            closeTimedPopup();
        }
    }, 1000);
}


// 5. 滚动进度奖励
function initScrollRewards() {
    console.log('初始化滚动进度奖励...');
    
    let scrollRewardsShown = {
        25: false,
        50: false,
        75: false,
        90: false
    };
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // 25%滚动奖励
        if (scrollPercent >= 25 && !scrollRewardsShown[25]) {
            showScrollReward('恭喜！您已浏览25%内容，获得额外优惠券！');
            scrollRewardsShown[25] = true;
        }
        
        // 50%滚动奖励
        if (scrollPercent >= 50 && !scrollRewardsShown[50]) {
            showScrollReward('太棒了！您已浏览50%内容，享受VIP价格！');
            scrollRewardsShown[50] = true;
        }
        
        // 75%滚动奖励
        if (scrollPercent >= 75 && !scrollRewardsShown[75]) {
            showScrollReward('即将完成！您已浏览75%内容，获得专属服务！');
            scrollRewardsShown[75] = true;
        }
        
        // 90%滚动奖励
        if (scrollPercent >= 90 && !scrollRewardsShown[90]) {
            showScrollReward('完美！您已浏览90%内容，现在购买享受最大优惠！');
            scrollRewardsShown[90] = true;
        }
    });
}

function showScrollReward(message) {
    console.log('显示滚动奖励:', message);
    
    // 创建奖励提示
    const rewardDiv = document.createElement('div');
    rewardDiv.className = 'scroll-reward';
    rewardDiv.innerHTML = `
        <div class="reward-content">
            <span class="reward-icon">🎉</span>
            <span class="reward-text">${message}</span>
            <button class="reward-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // 添加样式
    rewardDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4caf50, #45a049);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(rewardDiv);
    
    // 5秒后自动消失
    setTimeout(() => {
        if (rewardDiv.parentElement) {
            rewardDiv.remove();
        }
    }, 5000);
}

// 初始化营销功能
function initMarketingFeatures() {
    console.log('初始化营销功能...');
    // 倒计时功能
    startCountdown();
    
    // 新增营销功能
    initExitIntent();
    initPurchaseCounter();
    initTimedPopup();
    initScrollRewards();
    
    // 添加社会证明动画
    animateSocialProof();
    
    // 营销漏斗逻辑
    initMarketingFunnel();
    
    // 稀缺性管理
    manageScarcity();
}


// 倒计时功能
function startCountdown() {
    console.log('开始初始化倒计时...');
    
    // 等待DOM完全加载
    setTimeout(() => {
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        console.log('找到的元素:', { hoursElement, minutesElement, secondsElement });
        
        if (!hoursElement || !minutesElement || !secondsElement) {
            console.log('倒计时元素未找到，退出');
            return;
        }
        
        // 设置倒计时结束时间（24小时后）
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        console.log('倒计时结束时间:', new Date(endTime));
        
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = endTime - now;
            
            if (timeLeft > 0) {
                const hours = Math.floor(timeLeft / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                console.log(`倒计时更新: ${hours}:${minutes}:${seconds}`);
                
                hoursElement.textContent = hours.toString().padStart(2, '0');
                minutesElement.textContent = minutes.toString().padStart(2, '0');
                secondsElement.textContent = seconds.toString().padStart(2, '0');
            } else {
                // 倒计时结束，重置为24小时
                console.log('倒计时结束，重置');
                hoursElement.textContent = '23';
                minutesElement.textContent = '59';
                secondsElement.textContent = '59';
            }
        }
        
        // 立即更新一次
        updateCountdown();
        
        // 每秒更新一次
        setInterval(updateCountdown, 1000);
    }, 1000);
}

// 动态更新购买人数
function updatePurchaseCount() {
    const statElements = document.querySelectorAll('.stat');
    let currentCount = 12847;
    
    setInterval(() => {
        // 随机增加购买人数
        if (Math.random() < 0.3) { // 30%概率增加
            currentCount += Math.floor(Math.random() * 3) + 1;
            
            statElements.forEach(stat => {
                if (stat.textContent.includes('人购买')) {
                    stat.innerHTML = `👥 已有 <strong>${currentCount.toLocaleString()}</strong> 人购买`;
                }
            });
        }
    }, 5000);
}

// 添加紧迫感提示
function addUrgencyMessages() {
    const urgencyMessages = [
        "🔥 限时特惠，错过再等一年！",
        "⚡ 仅剩最后几个名额！",
        "💎 新用户专享，立即抢购！",
        "🎯 今日特价，明日恢复原价！"
    ];
    
    let messageIndex = 0;
    
    setInterval(() => {
        const urgencyBanner = document.querySelector('.urgency-text');
        if (urgencyBanner) {
            urgencyBanner.textContent = urgencyMessages[messageIndex];
            messageIndex = (messageIndex + 1) % urgencyMessages.length;
        }
    }, 8000);
}

// 社会证明动画
function animateSocialProof() {
    const stats = document.querySelectorAll('.stat');
    
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                stat.style.animation = '';
            }, 600);
        }, index * 200);
    });
}

// 添加购买按钮点击效果
function enhanceButtonClicks() {
    const buttons = document.querySelectorAll('.amount-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 显示购买提示
            showPurchaseHint(this);
        });
    });
}

// 显示购买提示
function showPurchaseHint(button) {
    const amount = button.getAttribute('data-amount');
    const hints = [
        `💰 选择¥${amount}套餐，立即享受专属服务！`,
        `🎯 已有${Math.floor(Math.random() * 1000) + 500}人选择此套餐！`,
        `⚡ 限时优惠，立即下单享受特价！`,
        `💎 优质内容，物超所值！`
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    // 创建提示元素
    const hintElement = document.createElement('div');
    hintElement.textContent = randomHint;
    hintElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b9d, #e91e63);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
        animation: bounce 0.6s ease-in-out;
    `;
    
    document.body.appendChild(hintElement);
    
    setTimeout(() => {
        hintElement.remove();
    }, 2000);
}

// 初始化按钮增强效果
document.addEventListener('DOMContentLoaded', enhanceButtonClicks);

// 初始化用户反馈滚轮（保留原有功能）
function initFeedbackCarousel() {
    // 这个函数现在主要用于兼容性，实际功能由新的函数处理
}

// 生成随机评价数据
function generateFeedbackData(count, type) {
    console.log('开始生成评价数据，数量:', count, '类型:', type);
    
    const names = [
        '231', '红', '李', '王', '张', '刘', '陈', '杨', '黄', '周',
        '小吴', '小郑', '小何', '小赵', '小钱', '小孙', '小胡', '小朱', '小高', '小林',
        '小徐', '小马', '小郭', '小罗', '小梁', '小宋', '小唐', '小许', '小韩', '小冯',
        '小邓', '小曹', '小彭', '小曾', '小萧', '小田', '小董', '小袁', '小潘', '小于',
        '小蒋', '小蔡', '小余', '小杜', '小叶', '小程', '小苏', '小魏', '小吕', '小丁'
    ];
    
    const avatars = ['👤', '👨', '👩', '🧑', '👦', '👧', '👶', '👴', '👵', '👱', '👲', '👳'];
    
    const feedbackTexts = [
        '内容质量很高，物超所值！',
        '服务态度很好，回复及时',
        '图片清晰，内容精彩',
        '性价比很高，推荐购买',
        '客服很专业，问题解决很快',
        '内容更新及时，质量稳定',
        '价格合理，服务周到',
        '购买流程简单，体验很好',
        '内容丰富多样，值得推荐',
        '客服态度友好，很有耐心',
        '内容质量超出预期',
        '服务专业，值得信赖',
        '购买后立即发货，效率很高',
        '内容真实，没有虚假宣传',
        '客服回复及时，解决问题快',
        '价格公道，性价比很高',
        '内容丰富，更新频率高',
        '服务态度好，体验很棒',
        '内容质量稳定，值得购买',
        '客服专业，服务周到',
        '购买流程顺畅，体验良好',
        '内容精彩，物有所值',
        '服务效率高，回复及时',
        '价格合理，质量保证',
        '内容丰富，满足需求',
        '客服态度好，解决问题快',
        '内容更新及时，质量稳定',
        '服务专业，值得推荐',
        '购买体验很好，会再次购买',
        '内容真实可靠，没有失望',
        '客服回复快，服务周到',
        '价格公道，性价比高',
        '内容丰富多样，质量很好',
        '服务态度友好，体验不错',
        '内容质量超出预期，很满意',
        '客服专业，问题解决及时',
        '购买流程简单，发货快速',
        '内容精彩，值得购买',
        '服务效率高，态度很好',
        '价格合理，质量保证',
        '内容丰富，更新及时',
        '客服回复及时，服务专业',
        '内容真实，没有虚假',
        '服务周到，体验良好',
        '价格公道，性价比很高',
        '内容丰富多样，质量稳定',
        '客服态度好，解决问题快',
        '内容更新及时，质量保证',
        '服务专业，值得信赖',
        '购买体验很好，推荐购买'
    ];
    
    const ratings = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
    
    const feedback = [];
    
    for (let i = 0; i < count; i++) {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
        const randomText = feedbackTexts[Math.floor(Math.random() * feedbackTexts.length)];
        const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
        
        feedback.push({
            name: randomName + (Math.floor(Math.random() * 999) + 1),
            avatar: randomAvatar,
            text: randomText,
            rating: randomRating
        });
    }
    
    console.log('评价数据生成完成，共', feedback.length, '条');
    return feedback;
}

// 初始化历史评价（100条）
function initHistoricalFeedback() {
    console.log('开始初始化历史评价...');
    const historicalTrack = document.getElementById('historicalTrack');
    if (!historicalTrack) {
        console.log('未找到historicalTrack元素');
        return;
    }
    console.log('找到historicalTrack元素');
    
    // 生成100条历史评价数据，确保快速加载
    const historicalFeedback = generateFeedbackData(100, 'historical');
    console.log('生成了', historicalFeedback.length, '条评价数据');
    
    // 渲染历史评价
    const htmlContent = historicalFeedback.map(item => `
        <div class="feedback-item" onclick="showFeedbackDetail(this)">
            <div class="user-avatar">${item.avatar}</div>
            <div class="feedback-content">
                <div class="user-name">${item.name}</div>
                <div class="feedback-text">"${item.text}"</div>
                <div class="feedback-rating">${item.rating}</div>
            </div>
        </div>
    `).join('');
    
    // 强制替换所有内容，确保显示200条评价
    console.log('强制替换所有内容，生成200条评价');
    historicalTrack.innerHTML = htmlContent;
    console.log('历史评价HTML已插入');
    
    // 复制反馈项以实现无缝滚动
    const feedbackItems = historicalTrack.querySelectorAll('.feedback-item');
    console.log('找到', feedbackItems.length, '个反馈项');
    
    // 复制所有项目，确保无缝循环
    feedbackItems.forEach(item => {
        const clone = item.cloneNode(true);
        historicalTrack.appendChild(clone);
    });
    
    console.log('复制完成，现在有', historicalTrack.querySelectorAll('.feedback-item').length, '个反馈项');
    
    // 添加鼠标悬停控制
    const carousel = document.getElementById('historicalFeedback');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            historicalTrack.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', function() {
            historicalTrack.style.animationPlayState = 'running';
        });
    }
    
    // 设置容器高度
    const totalItems = feedbackItems.length;
    const itemHeight = 80;
    const trackHeight = totalItems * itemHeight;
    historicalTrack.style.height = trackHeight + 'px';
    console.log('设置容器高度为:', trackHeight + 'px');
}

// 初始化今日评价（50条）
function initTodayFeedback() {
    console.log('开始初始化今日评价...');
    const todayTrack = document.getElementById('todayTrack');
    if (!todayTrack) {
        console.log('未找到todayTrack元素');
        return;
    }
    console.log('找到todayTrack元素');
    
    // 生成30条今日评价数据，确保快速加载
    const todayFeedback = generateFeedbackData(30, 'today');
    console.log('生成了', todayFeedback.length, '条今日评价数据');
    
    // 渲染今日评价
    const htmlContent = todayFeedback.map(item => `
        <div class="today-feedback-item" onclick="showTodayFeedbackDetail(this)">
            <div class="today-user-avatar">${item.avatar}</div>
            <div class="today-feedback-content">
                <div class="today-user-name">${item.name}</div>
                <div class="today-feedback-text">"${item.text}"</div>
                <div class="today-feedback-rating">${item.rating}</div>
            </div>
        </div>
    `).join('');
    
    // 强制替换所有内容，确保显示50条评价
    console.log('强制替换今日评价内容，生成50条评价');
    todayTrack.innerHTML = htmlContent;
    console.log('今日评价HTML已插入');
    
    // 复制反馈项以实现无缝滚动
    const feedbackItems = todayTrack.querySelectorAll('.today-feedback-item');
    console.log('找到', feedbackItems.length, '个今日反馈项');
    
    // 复制所有项目，确保无缝循环
    feedbackItems.forEach(item => {
        const clone = item.cloneNode(true);
        todayTrack.appendChild(clone);
    });
    
    console.log('今日评价复制完成，现在有', todayTrack.querySelectorAll('.today-feedback-item').length, '个反馈项');
    
    // 添加鼠标悬停控制
    const carousel = document.getElementById('todayFeedback');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            todayTrack.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', function() {
            todayTrack.style.animationPlayState = 'running';
        });
    }
    
    // 设置容器高度
    const totalItems = feedbackItems.length;
    const itemHeight = 60;
    const trackHeight = totalItems * itemHeight;
    todayTrack.style.height = trackHeight + 'px';
    console.log('设置今日评价容器高度为:', trackHeight + 'px');
}

// 显示今日评价详情
function showTodayFeedbackDetail(feedbackItem) {
    const userName = feedbackItem.querySelector('.today-user-name').textContent;
    const feedbackText = feedbackItem.querySelector('.today-feedback-text').textContent;
    
    const detailModal = document.createElement('div');
    detailModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    detailModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.4s ease-out;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #ff6b9d, #e91e63);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
                margin: 0 auto 20px;
            ">👤</div>
            <h3 style="color: #d63384; margin-bottom: 15px; font-size: 1.2rem;">${userName}</h3>
            <p style="color: #666; font-size: 1rem; line-height: 1.5; margin-bottom: 15px; font-style: italic;">"${feedbackText}"</p>
            <div style="color: #ffd700; font-size: 1.2rem; margin-bottom: 20px;">⭐⭐⭐⭐⭐</div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #ff6b9d, #e91e63);
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">关闭</button>
        </div>
    `;
    
    document.body.appendChild(detailModal);
    
    // 点击背景关闭
    detailModal.addEventListener('click', function(e) {
        if (e.target === detailModal) {
            detailModal.remove();
        }
    });
}

// 显示反馈详情
function showFeedbackDetail(feedbackItem) {
    const userName = feedbackItem.querySelector('.user-name').textContent;
    const feedbackText = feedbackItem.querySelector('.feedback-text').textContent;
    
    const detailModal = document.createElement('div');
    detailModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-in-out;
    `;
    
    detailModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.4s ease-out;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #ff6b9d, #e91e63);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                color: white;
                margin: 0 auto 20px;
            ">👤</div>
            <h3 style="color: #d63384; margin-bottom: 15px; font-size: 1.2rem;">${userName}</h3>
            <p style="color: #666; font-size: 1rem; line-height: 1.5; margin-bottom: 15px; font-style: italic;">"${feedbackText}"</p>
            <div style="color: #ffd700; font-size: 1.2rem; margin-bottom: 20px;">⭐⭐⭐⭐⭐</div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #ff6b9d, #e91e63);
                color: white;
                border: none;
                padding: 10px 25px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">关闭</button>
        </div>
    `;
    
    document.body.appendChild(detailModal);
    
    // 点击背景关闭
    detailModal.addEventListener('click', function(e) {
        if (e.target === detailModal) {
            detailModal.remove();
        }
    });
}

// 营销漏斗逻辑
function initMarketingFunnel() {
    // 显示欢迎弹窗
    setTimeout(() => {
        showWelcomePopup();
    }, 1000);
    
    // 步骤指示器更新
    updateFunnelSteps();
}

// 显示欢迎弹窗（优化版）
function showWelcomePopup() {
    const welcomePopup = document.getElementById('welcomePopup');
    if (welcomePopup) {
        // 确保没有其他弹窗显示
        closeAllMarketingPopups();
        
        // 显示欢迎弹窗
        welcomePopup.style.display = 'flex';
        welcomePopup.style.opacity = '0';
        welcomePopup.style.transform = 'scale(0.8)';
        
        // 添加显示动画
        setTimeout(() => {
            welcomePopup.style.opacity = '1';
            welcomePopup.style.transform = 'scale(1)';
        }, 50);
    }
}

// 关闭欢迎弹窗（超强优化版）
function closeWelcome() {
    console.log('closeWelcome函数被调用');
    
    try {
        const welcomePopup = document.getElementById('welcomePopup');
        if (welcomePopup) {
            console.log('找到欢迎弹窗，正在关闭');
            
            // 立即禁用按钮，防止重复点击
            const welcomeBtn = document.querySelector('.welcome-btn');
            if (welcomeBtn) {
                welcomeBtn.disabled = true;
                welcomeBtn.style.opacity = '0.5';
                welcomeBtn.textContent = '正在加载...';
            }
            
            // 添加关闭动画
            welcomePopup.style.transition = 'all 0.3s ease';
            welcomePopup.style.opacity = '0';
            welcomePopup.style.transform = 'scale(0.8)';
            
            // 延迟隐藏，避免卡顿
            setTimeout(() => {
                welcomePopup.style.display = 'none';
                
                // 恢复按钮状态
                if (welcomeBtn) {
                    welcomeBtn.disabled = false;
                    welcomeBtn.style.opacity = '1';
                    welcomeBtn.textContent = '立即体验';
                }
                
                // 开始营销引导
                try {
                    startMarketingGuidance();
                } catch (e) {
                    console.log('营销引导启动失败，但弹窗已关闭');
                }
            }, 300);
        } else {
            console.log('未找到欢迎弹窗元素，尝试强制关闭');
            // 强制关闭所有可能的弹窗
            const allPopups = document.querySelectorAll('[id*="popup"], [class*="popup"]');
            allPopups.forEach(popup => {
                if (popup.style.display !== 'none') {
                    popup.style.display = 'none';
                }
            });
        }
    } catch (error) {
        console.error('关闭欢迎弹窗时出错:', error);
        // 强制隐藏所有弹窗
        const welcomePopup = document.getElementById('welcomePopup');
        if (welcomePopup) {
            welcomePopup.style.display = 'none';
        }
    }
}

// 开始营销引导
function startMarketingGuidance() {
    // 高亮推荐套餐
    highlightRecommendedPackage();
    
    // 显示引导提示
    showGuidanceTips();
    
    // 开始行为追踪
    trackUserBehavior();
}

// 高亮推荐套餐
function highlightRecommendedPackage() {
    const bestValueBtn = document.querySelector('.amount-btn.best-value');
    if (bestValueBtn) {
        bestValueBtn.style.animation = 'pulse 2s infinite';
        bestValueBtn.style.transform = 'scale(1.05)';
    }
}

// 显示引导提示
function showGuidanceTips() {
    const tips = [
        "💡 推荐选择¥100套餐，性价比最高！",
        "🎯 已有2,847人选择此套餐，好评如潮！",
        "⚡ 限时特价，错过再等一年！",
        "💎 全套打包，一次购买终身享受！"
    ];
    
    let tipIndex = 0;
    
    setInterval(() => {
        showFloatingTip(tips[tipIndex]);
        tipIndex = (tipIndex + 1) % tips.length;
    }, 10000);
}

// 显示浮动提示
function showFloatingTip(message) {
    const tipElement = document.createElement('div');
    tipElement.textContent = message;
    tipElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d, #e91e63);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
        animation: slideIn 0.5s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(tipElement);
    
    setTimeout(() => {
        tipElement.remove();
    }, 4000);
}

// 更新漏斗步骤
function updateFunnelSteps() {
    const steps = document.querySelectorAll('.step');
    
    // 默认激活第一步
    steps[0].classList.add('active');
}

// 关闭所有营销弹窗（优化版）
function closeAllMarketingPopups() {
    console.log('关闭所有营销弹窗...');
    
    // 关闭限时弹窗优惠
    const timedPopup = document.getElementById('timedPopupOverlay');
    if (timedPopup && timedPopup.classList.contains('show')) {
        timedPopup.style.opacity = '0';
        setTimeout(() => {
            timedPopup.classList.remove('show');
        }, 200);
    }
    
    // 关闭离开页面挽留弹窗
    const exitIntentPopup = document.getElementById('exitIntentOverlay');
    if (exitIntentPopup && exitIntentPopup.classList.contains('show')) {
        exitIntentPopup.style.opacity = '0';
        setTimeout(() => {
            exitIntentPopup.classList.remove('show');
        }, 200);
    }
    
    // 关闭客服弹窗（如果存在）
    const serviceOverlay = document.querySelector('.service-overlay');
    if (serviceOverlay) {
        serviceOverlay.style.opacity = '0';
        setTimeout(() => {
            serviceOverlay.remove();
        }, 200);
    }
}

// 选择套餐
function selectPackage(amount, description) {
    console.log('选择套餐：', amount, description);
    
    // 关闭所有营销弹窗
    closeAllMarketingPopups();
    
    // 更新步骤指示器
    updateFunnelStep(2);
    
    // 显示选择确认
    showSelectionConfirmation(amount, description);
    
    // 更新稀缺性
    updateScarcity(amount);
    
    // 更新主页面上的二维码
    generateWechatQRCode(amount);
    
    // 更新金额显示
    const amountDisplay = document.getElementById('amount');
    if (amountDisplay) {
        amountDisplay.textContent = amount;
    }
    
    // 立即显示支付弹窗
    showQRPopup(amount);
}

// 更新漏斗步骤
function updateFunnelStep(stepNumber) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.classList.remove('active');
        if (index < stepNumber) {
            step.classList.add('active');
        }
    });
}

// 显示选择确认
function showSelectionConfirmation(amount, description) {
    const confirmation = document.createElement('div');
    confirmation.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.4);
            animation: bounce 0.6s ease-in-out;
        ">
            <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">
                ✅ 已选择套餐
            </div>
            <div style="font-size: 1rem;">
                ${description} - ¥${amount}
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        confirmation.remove();
    }, 2000);
}

// 稀缺性管理
function manageScarcity() {
    const remainingSpots = document.getElementById('remainingSpots');
    if (!remainingSpots) return;
    
    let spots = 11;
    
    // 随机减少名额
    setInterval(() => {
        if (Math.random() < 0.1 && spots > 1) { // 10%概率减少
            spots--;
            remainingSpots.textContent = spots;
            
            // 显示名额减少提示
            if (spots <= 5) {
                showScarcityAlert();
            }
        }
    }, 8000);
}

// 更新稀缺性
function updateScarcity(amount) {
    const remainingSpots = document.getElementById('remainingSpots');
    if (remainingSpots) {
        let spots = parseInt(remainingSpots.textContent);
        if (spots > 0) {
            spots--;
            remainingSpots.textContent = spots;
        }
    }
}

// 显示稀缺性警告
function showScarcityAlert() {
    const alert = document.createElement('div');
    alert.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff5722, #f44336);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(255, 87, 34, 0.4);
            animation: pulse 1s infinite;
        ">
            <div style="font-size: 1rem; font-weight: bold;">
                ⚠️ 名额即将售罄！
            </div>
            <div style="font-size: 0.9rem;">
                仅剩最后几个名额，立即抢购！
            </div>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// 行为引导
function addBehavioralNudges() {
    // 鼠标移动追踪
    let mouseIdleTime = 0;
    let lastMouseMove = Date.now();
    
    document.addEventListener('mousemove', () => {
        lastMouseMove = Date.now();
        mouseIdleTime = 0;
    });
    
    // 检查用户是否停留
    setInterval(() => {
        mouseIdleTime = Date.now() - lastMouseMove;
        
        // 如果用户停留超过30秒，显示引导
        if (mouseIdleTime > 30000) {
            showIdleGuidance();
            lastMouseMove = Date.now(); // 重置计时
        }
    }, 5000);
}

// 显示空闲引导
function showIdleGuidance() {
    const guidance = document.createElement('div');
    guidance.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff6b9d, #e91e63);
            color: white;
            padding: 15px 20px;
            border-radius: 25px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
            animation: bounce 0.6s ease-in-out;
            max-width: 250px;
        ">
            <div style="font-size: 0.9rem; font-weight: bold; margin-bottom: 5px;">
                💡 还在犹豫吗？
            </div>
            <div style="font-size: 0.8rem;">
                限时特惠，错过再等一年！
            </div>
        </div>
    `;
    
    document.body.appendChild(guidance);
    
    setTimeout(() => {
        guidance.remove();
    }, 4000);
}

// 用户行为追踪
function trackUserBehavior() {
    let scrollDepth = 0;
    let timeOnPage = 0;
    
    // 追踪滚动深度
    window.addEventListener('scroll', () => {
        scrollDepth = Math.max(scrollDepth, window.scrollY / (document.body.scrollHeight - window.innerHeight));
    });
    
    // 追踪页面停留时间
    setInterval(() => {
        timeOnPage++;
        
        // 根据用户行为显示不同引导
        if (timeOnPage > 60 && scrollDepth < 0.5) {
            showScrollGuidance();
        }
    }, 1000);
}

// 显示滚动引导
function showScrollGuidance() {
    const scrollGuide = document.createElement('div');
    scrollGuide.innerHTML = `
        <div style="
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: linear-gradient(135deg, #2196f3, #1976d2);
            color: white;
            padding: 12px 18px;
            border-radius: 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
            animation: float 2s ease-in-out infinite;
        ">
            <div style="font-size: 0.8rem; font-weight: bold;">
                👆 向下滚动查看更多
            </div>
        </div>
    `;
    
    document.body.appendChild(scrollGuide);
    
    setTimeout(() => {
        scrollGuide.remove();
    }, 3000);
}

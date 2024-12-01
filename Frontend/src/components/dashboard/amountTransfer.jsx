import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUniversity, faWallet, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import styles from './amountTransfer.module.css';

const AmountTransfer = () => {
  // Get user details from localStorage
  const user = JSON.parse(localStorage.getItem('User')) || {};  // Fetch user data from localStorage
  const userName = user.username || 'User Name';
  const userEmail = user.email || 'user@example.com';

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.profile}>
        <div className={styles.avatar} />
        <div>
          <div className={styles.name}>{userName}</div>
          <div className={styles.email}>{userEmail}</div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${styles.glass}`}>
          <div className={styles.cardBackground}></div>
          <div>{userName}</div>
          <div className={styles.cardDetails}>
            <div>Amazon Platinum</div>
            <div>1234 .... .... 5678</div>
            <div>$56,745.89</div>
          </div>
        </div>
      </div>
      <div className={styles.amountTransferContainer}>
        <div className={styles.transferItem}>
          <div className={`${styles.transferIcon} ${styles.cardIcon}`}>
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
          <div className={styles.transferText}>
            Transfer via Card<br />$12,000
          </div>
        </div>
        <div className={styles.transferItem}>
          <div className={`${styles.transferIcon} ${styles.bankIcon}`}>
            <FontAwesomeIcon icon={faUniversity} />
          </div>
          <div className={styles.transferText}>
            Transfer to Same Bank<br />$45,000
          </div>
        </div>
        <div className={styles.transferItem}>
          <div className={`${styles.transferIcon} ${styles.walletIcon}`}>
            <FontAwesomeIcon icon={faWallet} />
          </div>
          <div className={styles.transferText}>
            Transfer via Wallet<br />$40,000
          </div>
        </div>
        <div className={styles.transferItem}>
          <div className={`${styles.transferIcon} ${styles.wallet2Icon}`}>
            <FontAwesomeIcon icon={faPiggyBank} />
          </div>
          <div className={styles.transferText}>
            Transfer via Wallet<br />$11,500
          </div>
        </div>
      </div>
      <button className={styles.viewAllButton}>View All</button>
    </div>
  );
};

export default AmountTransfer;
